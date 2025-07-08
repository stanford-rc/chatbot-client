const apiUrl = "http://127.0.0.1:8000/query/";

console.log('apiUrl', apiUrl);

//curl -X POST -H "Content-Type: application/json" -d '{"user_query":"why?"}' http://sh03-13n01:8000/query/

var sendData = {
  "query": "How do I use flask on sherlock",
}

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
  }
}

const chatEasy = async (message, cluster) => {
  console.log("chatEasy ", message);
  //const htmlText = md.render(message)
  addMessage(message, "start", cluster);
}
const addMessage = (msg, direction, cluster) => {
  const messageHolder = document.getElementById("messageHolder");
  const message = document.createElement("div");
  const colour = direction !== "start" ? "bg-fog-light" : "shadow";
  const colorClass = colour;
  const clusterClass = cluster;
  var clusterString = "";
  if (cluster) {
    clusterString = `<div class=" ${clusterClass}"> ${cluster}</div>`
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
  const messageText = '<div class="fa-3x thinking flex flex-col flex-start"><i class="fa-solid fa-cog fa-spin"></i> SPIN!</div>'
  const messageHolder = document.getElementById("messageHolder");
  message.innerHTML = messageText;

  //onst message = messageHolder.createElement("div");

messageHolder.appendChild(message);

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