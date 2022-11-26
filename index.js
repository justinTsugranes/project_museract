import { postsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

document.addEventListener('click', function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like)
  } else if (e.target.dataset.repost) {
    handleRepostClick(e.target.dataset.repost)
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply)
  } else if (e.target.id === 'post-btn') {
    handlePostBtnClick()
  }
})

function handleLikeClick(postId) {
  const targetPostObj = postsData.filter(function (post) {
    return post.uuid === postId
  })[0]

  if (targetPostObj.isLiked) {
    targetPostObj.likes--
  } else {
    targetPostObj.likes++
  }
  targetPostObj.isLiked = !targetPostObj.isLiked
  render()
}

function handleRepostClick(postId) {
  const targetPostObj = postsData.filter(function (post) {
    return post.uuid === postId
  })[0]

  if (targetPostObj.isReposted) {
    targetPostObj.reposts--
  } else {
    targetPostObj.reposts++
  }
  targetPostsObj.isReposted = !targetPostObj.isReposted
  render()
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handlePostBtnClick() {
  const postInput = document.getElementById('post-input')

  if (postInput.value) {
    postsData.unshift({
      handle: `@misfitDodo`,
      profilePic: `images/misfitdodo.jpg`,
      likes: 0,
      reposts: 0,
      postText: postInput.value,
      replies: [],
      isLiked: false,
      isReposted: false,
      uuid: uuidv4(),
    })
    render()
    postInput.value = ''
  }
}

function getFeedHtml() {
  let feedHtml = ``

  postsData.forEach(function (post) {
    let likeIconClass = ''

    if (post.isLiked) {
      likeIconClass = 'liked'
    }

    let repostIconClass = ''

    if (post.isReposted) {
      repostIconClass = 'reposted'
    }

    let repliesHtml = ''

    if (post.replies.length > 0) {
      post.replies.forEach(function (reply) {
        repliesHtml += `
<div class="post-reply">
    <div class="post-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="post-text">${reply.postText}</p>
            </div>
        </div>
</div>
`
      })
    }

    feedHtml += `
<div class="post">
    <div class="post-inner">
        <img src="${post.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${post.handle}</p>
            <p class="post-text">${post.postText}</p>
            <div class="post-details">
                <span class="post-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${post.uuid}"
                    ></i>
                    ${post.replies.length}
                </span>
                <span class="post-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${post.uuid}"
                    ></i>
                    ${post.likes}
                </span>
                <span class="post-detail">
                    <i class="fa-solid fa-retweet ${repostIconClass}"
                    data-repost="${post.uuid}"
                    ></i>
                    ${post.reposts}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${post.uuid}">
        ${repliesHtml}
    </div>   
</div>
`
  })
  return feedHtml
}

function render() {
  document.getElementById('feed').innerHTML = getFeedHtml()
}

render()
