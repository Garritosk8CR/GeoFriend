export default function newPost({postMessage, fromUser, toUser}) {
    var post = {}
    post.emitterId = fromUser.slug
    post.userId = toUser.slug
    post.message = postMessage
    post.emitterUsername = fromUser.name
    return post
}
