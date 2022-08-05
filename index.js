
document.getElementById("addCommentToRoot").addEventListener('click',function(){
    addComment(addCommentToRoot)
})
const root = document.getElementById("root");
function createInputNode(){
    let inputNode = document.createElement("input")   
    inputNode.type = "text";
    inputNode.className = "inputBox"
    return inputNode;
}
function threadComment(node){
    let textArea = document.createElement("P")
    textArea.innerHTML = node.firstChild.value
    return textArea
}
function deleteThreadIcon(node){
    let deleteIcon = document.createElement("button")
    deleteIcon.classList.add("deleteIcon")
    deleteIcon.innerHTML = `<span class="material-symbols-outlined">delete</span>`
    return deleteIcon
}
function createThreadTextBlock(node){
    let ThreadTextBlock = document.createElement("div")
    ThreadTextBlock.classList.add("textContentAndDelete")
    ThreadTextBlock.appendChild(threadComment(node))
    ThreadTextBlock.appendChild(deleteThreadIcon(node))
    return ThreadTextBlock;
}
function createLikeIcon(){
    let likeIcon = document.createElement("button")
    likeIcon.classList.add("likeIcon")
    likeIcon.innerHTML = `<span class="material-symbols-outlined">thumb_up</span>`
    return likeIcon
}
function createdisLikeIcon(){
    let dislikeIcon = document.createElement("button")
    dislikeIcon.classList.add("dislikeIcon")
    dislikeIcon.innerHTML = `<span class="material-symbols-outlined">thumb_down</span>`
    return dislikeIcon
}
function createAddCommentIcon(){
    let AddIcon = document.createElement("button")
    AddIcon.classList.add("addIcon")
    AddIcon.innerHTML = `<span class="material-symbols-outlined">add_comment</span>`
    AddIcon.addEventListener('click',function(){
        addComment(AddIcon.parentElement.parentElement.parentElement)
    })
    return AddIcon
}
function CreateReplyCommentIcon(){
    let replyIcon = document.createElement("button")
    replyIcon.classList.add("replyIcon")
    replyIcon.innerHTML = `<span class="material-symbols-outlined">reply</span>`
    replyIcon.addEventListener('click',function(){
        addComment(replyIcon.parentElement.parentElement)
    })
    return replyIcon
}
function createThreadBtnBlock(node){
    let ThreadBtnBlock = document.createElement("div")
    ThreadBtnBlock.appendChild(createLikeIcon())
    ThreadBtnBlock.appendChild(createdisLikeIcon())
    ThreadBtnBlock.appendChild(createAddCommentIcon())
    ThreadBtnBlock.appendChild(CreateReplyCommentIcon())
    return ThreadBtnBlock
}
function createThread(node){
    let thread = document.createElement("div")
    thread.classList.add("textBlockSection")
    console.log("printing Node")
    console.log(node.parentElement)
    thread.setAttribute("id",`root-${node.parentElement.dataset.depth}`)
    thread.setAttribute("data-depth",Number(node.parentElement.dataset.depth)+1)
    thread.appendChild(createThreadTextBlock(node))
    thread.appendChild(createThreadBtnBlock(node))
    return thread
}
function createComment(button){
    let node = button.parentElement;
    console.log(node.firstChild.value)
    let thread = createThread(node)
    let nodeparent = node.parentElement;
    console.log(nodeparent)
    console.log(node)
    thread.style.marginLeft = "5%"
    nodeparent.replaceChild(thread,node);
}
function createSubmitButton(){
    let button = document.createElement("button")
    button.innerHTML = `<span class="material-symbols-outlined">send</span>`;
    button.classList.add("submitComment")
    button.addEventListener("click",function(){
        createComment(button)
    })
    return button
}
function inputTag(){
    let node = document.createElement("div")
    node.classList.add("inputBlockSection")
    node.appendChild(createInputNode())
    node.appendChild(createSubmitButton())
    node.style.marginLeft = "5%"
    return node
}
function addComment(blockClicked){
    console.log(blockClicked)
    if(blockClicked.id === "addCommentToRoot"){
        while(root.hasChildNodes()){
            root.removeChild(root.firstChild)
        }
        root.appendChild(inputTag())
    } else{
        blockClicked.appendChild(inputTag())
    }
}