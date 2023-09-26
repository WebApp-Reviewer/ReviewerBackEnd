import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useState } from "react";
import { editWebsite, deleteWebsite } from "../ajaxHelper";

const SingleWebsite = () => {
    const { _id } = state;
    const [thisWebsite, setThisWebsite] = useState({ ...state });
    const { author, name, url, description } = thisWebsite;
    const [isEdited, setIsEdited] = useState(false);
    const token = localStorage.getItem('token')
    const { username } = jwt_decode(token);
    const [websiteName, setWebsiteName] = useState(name);
    const [websiteDescription, setWebsiteDescription] = useState(description);
    const [websiteUrl, setWebsiteUrl] = useState(url);
    const [websiteImage, setWebsiteImage] = useState(url);



    const navigate = useNavigate();

    async function edit(e) {
        e.preventDefault()

        const website = {
            website: {
                title: websiteName,
                description: websiteDescription,
                url: websiteUrl,
                image: websiteImage,
            }
        }

        console.log(websiteName)
        console.log(websiteDescription)
        console.log(websiteUrl)
        console.log(websiteImage)

        const token = localStorage.getItem('token')

        const response = await editWebsite(website, _id, token);

        const updateWebsites = JSON.parse(localStorage.getItem('websites')).map((p) => {
            if (p._id === _id) {
                return response
            } else {
                return p
            }
        })
        localStorage.setItem('posts', JSON.stringify(updateWebsites))
        setIsEdited(false);
        setThisWebsite(response);
        return response;
    }

    async function deletewebsite(e) {
        e.preventDefault()
        const response = await deleteWebsite(_id, token);
        navigate('/websites');
        return response
    }

    return (
        <>
            <div key={_id} className="websites">
                <h2>{name}</h2>
                {description ? <h4>Description: {description}</h4> : null}
                {url ? <h4>URL: {url}</h4> : null}
                {image ? <h4>Location: {image}</h4> : null}
                {author.username === username ? <button onClick={() => { setIsEdited(true) }} className="functionalButton">Edit Post</button> : null}
                {author.username === username ? <button onClick={deletepost} className="functionalButton">Delete Post</button> : null}
            </div>
            {
                isEdited ?
                    <form onSubmit={edit} className="panel">
                        <h1>Edit Post</h1>
                        <input
                            type="text"
                            defaultValue={thisWebsite.name}
                            placeholder="name"
                            onChange={(e) => setWebsiteName(e.target.value)}
                        />
                        <input
                            type="text"
                            defaultValue={thisWebsite.description}
                            placeholder="description"
                            onChange={(e) => setWebsiteDescription(e.target.value)}
                        />
                        <input
                            type="text"
                            defaultValue={thisWebsite.url}
                            placeholder="url"
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                        />
                        <input
                            type="text"
                            defaultValue={thisWebsite.image}
                            placeholder="image"
                            onChange={(e) => setWebsiteImage(e.target.value)}
                        />
                        <button type="submit" className="createButton">Edit</button>
                    </form> : null
            }
            <div>
                {
                    author.username === username
                        ? null :
                        messages?.map(({ _id, content, fromUser }) => (
                            <div key={_id}>
                                <h2>From: {fromUser}</h2>
                                <h4>{content}</h4>
                            </div>
                        ))
                }
            </div>
        </>
    )
}

export default SingleWebsite;