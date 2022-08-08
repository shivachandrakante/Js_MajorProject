const root = document.getElementById("root");

document.getElementById("addCommentToRoot").addEventListener('click',function(){
    addComment(addCommentToRoot)
})

document.getElementById("deleteFromRoot").addEventListener('click',function(){
    deleteInputTag(root)
    window.setTimeout(() => {
        window.location.reload(true);
    }, 200);
})

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
    deleteIcon.addEventListener('click',function(){
        deleteInputTag(deleteIcon.parentElement)
    })
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
function unFoldThreads(node){
    while(node.nextSibling !== null ){
        if (node.nextSibling.style.display === "none") {
            node.nextSibling.style.display = "block";
        } else {
            node.nextSibling.style.display = "none";
        }
        node = node.nextSibling
    }
}
function CreateExpandIcon(){
    let unFoldIcon = document.createElement("button")
    unFoldIcon.classList.add("expanndIcon")
    unFoldIcon.innerHTML = `<span class="material-symbols-outlined">unfold_less</span>`
    unFoldIcon.addEventListener('click',function(){
        if(unFoldIcon.innerHTML === `<span class="material-symbols-outlined">unfold_less</span>`){
            unFoldIcon.innerHTML = `<span class="material-symbols-outlined">unfold_more</span>`
        } else{
            unFoldIcon.innerHTML = `<span class="material-symbols-outlined">unfold_less</span>`
        }
        unFoldThreads(unFoldIcon.parentElement)
    })
    return unFoldIcon
}
function createThreadBtnBlock(node){
    let ThreadBtnBlock = document.createElement("div")
    ThreadBtnBlock.appendChild(createLikeIcon())
    ThreadBtnBlock.appendChild(createdisLikeIcon())
    ThreadBtnBlock.appendChild(createAddCommentIcon())
    ThreadBtnBlock.appendChild(CreateReplyCommentIcon())
    ThreadBtnBlock.appendChild(CreateExpandIcon())
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
function deleteInputTag(button){
    let node = button.parentElement
    node.remove()
}
function createCancelNode(){
    let button = document.createElement("button")
    button.innerHTML = `<span class="material-symbols-outlined">cancel</span>`;
    button.classList.add("deleteComment")
    button.addEventListener("click",function(){
        deleteInputTag(button)
    })
    return button
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
    node.appendChild(createCancelNode())
    node.appendChild(createSubmitButton())
    node.style.marginLeft = "5%"
    return node
}
function addComment(blockClicked){
    console.log(blockClicked)
    if(blockClicked.id === "addCommentToRoot"){
        console.log("asdasd")
        /*while(root.hasChildNodes()){
            root.removeChild(root.firstChild)
        }*/
        root.appendChild(inputTag())
    } else{
        // let input = inputTag();
        // input.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        blockClicked.appendChild(inputTag())
    }
}