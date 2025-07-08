import { GoogleGenerativeAI } from "@google/generative-ai";
const conv = new showdown.Converter();

const genAI = new GoogleGenerativeAI("AIzaSyDpWT-nUxzxgvDQ-ryOk4Zo6QrlPhGmgy0");
const gen_model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const chat = gen_model.startChat({
    generationConfig: {
        maxOutputTokens: 1000,
    },
});


const chatGemini = async (message) => {
    addMessage(message, "end");
    let res = await chat.sendMessage(message);
    res = await res.response;
    console.log(res);
    let html = conv.makeHtml(res.text());
    addMessage(html, "start");
}
const addMessage = (msg, direction) => {
    const messageHolder = document.getElementById("messageHolder");
    const message = document.createElement("div");
    const colour = direction !== "start" ? "bg-fog-light" : "shadow";
    const colorClass = colour;
    const flexClass = "items-" + direction;
    console.log('colorClass',colorClass);
    message.innerHTML = `
     <div class="flex flex-col ${flexClass}">
            <div class="${colorClass} px-8 py-4 rounded-md text-default w-fit 
            max-w-4xl mb-12">${msg}</div>
          </div>
    `
    messageHolder.appendChild(message);
}

const messageInput = document.getElementById("chat");
const sendBtn = document.getElementById("btn");

messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        console.log('submitting',event);
    const message = messageInput.value;
    chatGemini(message);
    messageInput.value = "";
    }
});

sendBtn.addEventListener("click", function () {
    const message = messageInput.value;
    chatGemini(message);
    messageInput.value = "";
});
