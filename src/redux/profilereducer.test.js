import profilereducer, {addPost, deletepost} from "./profilereducer";
import {render} from "@testing-library/react";
import App from "../App";
import React from "react";
test('new post should be added', () => {

    let action = addPost('Tigran Arshakyan')
    let state = {
        posts: []
    }
    let newState = profilereducer(state,action)
    expect(newState.posts.length).toBe(1);
});
test('new post text should be correct', () => {

    let action = addPost('Tigran Arshakyan')
    let state = {
        posts: []
    }
    let newState = profilereducer(state,action)
    expect(newState.posts[0].post).toBe('Tigran Arshakyan')
});
test('deleting should be correct', () => {

    let action = deletepost(1)
    let state = {
        posts: [{id:1, post: 'Tigran Arshakyan', likes:0}]
    }
    let newState = profilereducer(state,action)
    expect(newState.posts.length).toBe(0)
});
test(`deleting shouldn't be correct, if id is invalid`, () => {

    let action = deletepost(10)
    let state = {
        posts: [{id:1, post: 'Tigran Arshakyan', likes:0}]
    }
    let newState = profilereducer(state,action)
    expect(newState.posts.length).toBe(1)
});
