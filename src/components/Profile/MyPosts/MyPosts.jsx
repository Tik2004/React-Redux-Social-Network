import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {AddPostFormRedux} from "./AddPostForm";


const MyPosts = React.memo(props => {

    let postselements = [...props.posts].reverse().map(p => <Post message={p.post} likes={p.likes}/>)

    let addNewPost = (values) => {
        props.addPost(values.newPostText);

    }


    return (
        <div className={s.postsBlock}>
            <div className={s.mypostik}><h3>My Posts</h3></div>
            <div>
                <AddPostFormRedux onSubmit={addNewPost}/>
                <div className={s.posts}>
                    {postselements}
                </div>
            </div>
        </div>
    )
});

export default MyPosts