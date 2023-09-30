const db = require('./client');
//const util = require('./utils');

//database functions 
async function getAllWebsites() {
    try {
        const {rows} = await db.query(`
        SELECT * FROM websites;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getWebsiteById(id) {
    try {
        const {rows: [website]} = await db.query(`
        SELECT * from websites
        WHERE id = $1
        `, [id]);
        return website;
    } catch (error) {
        throw error;
    }
}

async function getWebsiteByName(name) {
    try {
        const {rows: [website]} = await db.query(`
        SELECT * FROM websites
        WHERE name = $1
        `, [name]);
        return website;
    } catch (error) {
        throw error;
    }
}

async function deleteWebsite(id) {
    try {
        const {rows: [websites]} = await db.query(`
        DELETE FROM websites
        WHERE id = $1
        RETURNING *;
        `, [id]);
        return websites;
    } catch (error) {
        throw error;
    }
}

async function createWebsite({
    name,
    url,
    description,
    image,
    tags = []
  }) {
    try {
      const { rows: [ website ] } = await db.query(`
        INSERT INTO websites(name, url, description, image) 
        VALUES($1, $2, $3, $4)
        RETURNING *;
      `, [name, url, description, image]);
  
      const tagList = await createTags(tags);
  
      return await addTagsToWebsite(website.id, tagList);
    } catch (error) {
      throw error;
    }
  }
  
  async function updateWebsite(websiteId, fields = {}) {
    // read off the tags & remove that field 
    const { tags } = fields; // might be undefined
    delete fields.tags;
  
    // build the set string
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    try {
      // update any fields that need to be updated
      if (setString.length > 0) {
        await db.query(`
          UPDATE websites
          SET ${ setString }
          WHERE id=${ websiteId }
          RETURNING *;
        `, Object.values(fields));
      }
  
      // return early if there's no tags to update
      if (tags === undefined) {
        return await getWebsiteById(websiteId);
      }
  
      // make any new tags that need to be made
      const tagList = await createTags(tags);
      const tagListIdString = tagList.map(
        tag => `${ tag.id }`
      ).join(', ');
  
      // delete any post_tags from the database which aren't in that tagList
      await db.query(`
        DELETE FROM websites_tags
        WHERE tagid
        NOT IN (${ tagListIdString })
        AND websiteid=$1;
      `, [websiteId]);
      
      // and create post_tags as necessary
      await addTagsToWebsite(websiteId, tagList);
  
      return await getWebsiteById(websiteId);
    } catch (error) {
      throw error;
    }
  }
  
  /*async function getAllWebsites() {
    try {
      const { rows: websiteIds } = await db.query(`
        SELECT id
        FROM websites;
      `);
  
      const websites = await Promise.all(websiteIds.map(
        website => getWebsiteById( website.id )
      ));
  
      return websites;
    } catch (error) {
      throw error;
    }
  }*/
  
  async function getWebsiteById(websiteId) {
    try {
      const { rows: [ website ]  } = await db.query(`
        SELECT *
        FROM websites
        WHERE id=$1;
      `, [websiteId]);
  
      if (!website) {
        throw {
          name: "WebsiteNotFoundError",
          message: "Could not find a website with that ID"
        };
      }
  
      const { rows: tags } = await db.query(`
        SELECT tags.*
        FROM tags
        JOIN websites_tags ON tags.id=websites_tags.tagid
        WHERE websites_tags.websiteid=$1;
      `, [websiteId])
  
      website.tags = tags;
  
      return website;
    } catch (error) {
      throw error;
    }
  }
  
  async function getWebsitesByTagName(tagName) {
    try {
      const { rows: websiteIds } = await db.query(`
        SELECT websites.id
        FROM websites
        JOIN websites_tags ON websites.id=website_tags.websiteid
        JOIN tags ON tags.id=websites_tags.tagid
        WHERE tags.name=$1;
      `, [tagName]);
      
      return await Promise.all(websiteIds.map(
        website => getWebsiteById(website.id)
      ));
    } catch (error) {
      throw error;
    }
  } 
  
  /**
   * TAG Methods
   */
  
  async function createTags(tagList) {
    if (tagList.length === 0) {
      return;
    }
  
    const valuesStringInsert = tagList.map(
      (_, index) => `$${index + 1}`
    ).join('), (');
  
    const valuesStringSelect = tagList.map(
      (_, index) => `$${index + 1}`
    ).join(', ');
  
    try {
      // insert all, ignoring duplicates
      await db.query(`
        INSERT INTO tags(name)
        VALUES (${ valuesStringInsert })
        ON CONFLICT (name) DO NOTHING;
      `, tagList);
  
      // grab all and return
      const { rows } = await db.query(`
        SELECT * FROM tags
        WHERE name
        IN (${ valuesStringSelect });
      `, tagList);
  
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  async function createWebsiteTag(websiteId, tagId) {
    try {
      await db.query(`
        INSERT INTO websites_tags(websiteid, tagid)
        VALUES ($1, $2)
        ON CONFLICT (websiteid, tagid) DO NOTHING;
      `, [ websiteId, tagId ]);
    } catch (error) {
      throw error;
    }
  }
  
  async function addTagsToWebsite(websiteId, tagList) {
    try {
      const createWebsiteTagPromises = tagList.map(
        tag => createWebsiteTag(websiteId, tag.id)
      );
  
      await Promise.all(createWebsiteTagPromises);
  
      return await getWebsiteById(websiteId);
    } catch (error) {
      throw error;
    }
  }
  
  async function getAllTags() {
    try {
      const { rows } = await db.query(`
        SELECT * 
        FROM tags;
      `);
  
      return { rows }
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    getAllWebsites,
    getWebsiteById,
    getWebsiteByName,
    createWebsite,
    updateWebsite,
    deleteWebsite,
    getAllTags,
    addTagsToWebsite,
    createWebsiteTag,
    createTags,
    getWebsitesByTagName,

}