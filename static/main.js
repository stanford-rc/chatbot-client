const apiUrl = "http://127.0.0.1:8000/query/";

console.log('apiUrl', apiUrl);

//curl -X POST -H "Content-Type: application/json" -d '{"user_query":"why?"}' http://sh03-13n01:8000/query/

const sendMessage = async (message) => {
  addMessage(message, "end");
  addThinking();
  let sendData = {
    "query": message
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
    chatEasy(resData.answer, resData.cluster);
  } catch (error) {
    console.error('Some Error Occured:', error);
    var errorMessage = "Something has gone wrong, please try again.";
    console.error('errorMessage:', errorMessage);
    chatEasy(errorMessage, '');
  }
}

const chatEasy = async (message, cluster) => {
  console.log("chatEasy ", message);
  const mdMessage = marked.parse(message);
  console.log('mdMessage', mdMessage);
  addMessage(mdMessage, "start", cluster);
}
const addMessage = (msg, direction, cluster) => {
  removeThinking();
  const messageHolder = document.getElementById("messageHolder");
  const message = document.createElement("div");
  const color = direction !== "start" ? "bg-fog-light" : "shadow";
  const colorClass = color;
  const clusterClass = cluster;
  var clusterString = "";
  if (cluster) {
    clusterString = `<div class="cluster-label ${clusterClass}"> ${cluster}</div>`
  }
  const flexClass = "items-" + direction;
  console.log('colorClass', colorClass);
  message.innerHTML = `
     <div class="flex flex-col ${flexClass}">
            <div class="${colorClass} px-8 py-4 rounded-md text-default w-fit 
            max-w-4xl mb-12">${msg}</div>
            ${clusterString}
           </div>           
    `
  messageHolder.appendChild(message);
}

const addThinking = () => {
  console.log('adding thinking');
  var message = document.createElement("div");
  message.id = 'thinking';
  const messageText = '<div class="loader"></div>'
  const messageHolder = document.getElementById("messageHolder");
  message.innerHTML = messageText;
  messageHolder.appendChild(message);
}

const removeThinking = () => {
  console.log('removing thinking');
  const thinking = document.getElementById("thinking");
  if (thinking) {
    thinking.remove();
  }
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