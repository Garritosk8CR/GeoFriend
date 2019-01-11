export function newGlobalMessage({message, user, timestamp}) {
    var globalMessage = {
        message,
        userAlias: user.alias,
        userId: user.id,
        timestamp
    }
    return globalMessage
}
// export function newChatMessage({postMessage, fromUser, toUser}) {
//     var post = {}
//     post.emitterId = fromUser.slug
//     post.userId = toUser.slug
//     post.message = postMessage
//     post.emitterUsername = fromUser.name
//     return post
// }
