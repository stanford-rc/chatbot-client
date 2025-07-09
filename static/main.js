const apiUrl = "http://127.0.0.1:8000/query/";

console.log('apiUrl', apiUrl);

//curl -X POST -H "Content-Type: application/json" -d '{"user_query":"why?"}' http://sh03-13n01:8000/query/

var currentCluster = "";
var existing = [];
const sendMessage = async (message) => {
  addMessage(message, "end");
  addThinking();
  let sendData = {
    "query": message,
    "cluster": currentCluster
  }
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    });
    if (!response.ok) {
      throw new Error(
        `Unable to Fetch Data, Please check URL
                or Network connectivity!!`
      );
    }
    const resData = await response.json();
    console.log('resData:', resData);
    console.log('resData.answer:', resData.answer);
    convertMarkdown(resData.answer, resData.cluster);
    currentCluster = resData.cluster;
  } catch (error) {
    console.error('Some Error Occured:', error);
    var errorMessage = "Something has gone wrong, please try again.";
    console.error('errorMessage:', errorMessage);
    convertMarkdown(errorMessage, currentCluster);
  }
}

const convertMarkdown = async (message, cluster) => {
  console.log("convertMarkdown ", message);
  const mdMessage = marked.parse(message);
  console.log('mdMessage', mdMessage);
  addMessage(mdMessage, "start", cluster);
}
const addMessage = (msg, direction, cluster) => {
  removeThinking();
  const messageHolder = document.getElementById("messageHolder");
  const message = document.createElement("div");
  const bgColorClass = direction !== "start" ? "bg-digital-red" : "bg-gray-100";
  const pfp = '<img class="w-40 h-40 rounded-full" src="/static/images/ada.png" alt="Ada" />'
  const icon = direction !== "start" ? "" : pfp;
  const colClass = direction !== "start" ? "flex-col" : "";
  const cornerClass = direction !== "start" ? "" : "rounded-tl-none";
  const colorClass = direction !== "start" ? "text-white" : "text-neutral-800";
  const clusterClass = cluster;
  var clusterString = "";
  if (cluster) {
    clusterString = `<div class="cluster-label ${clusterClass}"> ${cluster}</div>`
  }
  const flexClass = "items-" + direction;
  console.log('colorClass', colorClass);
  message.innerHTML = `
     <div class="flex ${colClass} ${flexClass} gap-25 m-12">
     ${icon}
     <div class="${bgColorClass} ${colorClass} ${cornerClass} flex-col flex max-w-60 leading-1.5 p-12 border-gray-200  rounded-xl dark:bg-gray-700">${msg}
     </div>         
    `
  messageHolder.appendChild(message);
  scrollDown();

}

const scrollDown = function(){
  const messageHolder = document.getElementById("messageHolder");
           messageHolder.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
                inline: 'nearest'
            });
             console.log('scrolling message');
            document.getElementById("chat").focus();
}


const addThinking = () => {
  console.log('adding thinking');
  var message = document.createElement("div");
  message.id = 'thinking';
  const messageText = '<div class="loader"></div>'
  const messageHolder = document.getElementById("messageHolder");
    message.innerHTML = `
<div class="flex  items-start gap-25 m-12">
     <img class="w-40 h-40 rounded-full" src="/static/images/ada.png" alt="Ada">
     <div class="bg-gray-100 text-neutral-800 rounded-tl-none flex-col flex max-w-60 min-w-90 p-12 border-gray-200 rounded-xl dark:bg-gray-700">${messageText}
     </div>         
    </div>    
    `
  messageHolder.appendChild(message);
  scrollDown();
}

const removeThinking = () => {
  console.log('removing thinking');
  const thinking = document.getElementById("thinking");
  if (thinking) {
    thinking.remove();
  }
    scrollDown();
}

const messageInput = document.getElementById("chat");
const sendBtn = document.getElementById("btn");

messageInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    //console.log('submitting', event);
    const message = messageInput.value;
    sendMessage(message);
    //console.log('message input enter', message);
    messageInput.value = "";
  }
});

sendBtn.addEventListener("click", function() {
  const message = messageInput.value;
  //console.log('message input send', message);
  sendMessage(message);
  messageInput.value = "";
});

const helloMessage = "Hi! I'm Ada. I can help you learn how to use Stanford's HPC resources."
addMessage(helloMessage, "start");