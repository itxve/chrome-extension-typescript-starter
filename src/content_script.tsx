function getInput() {
  creatButton();
  document.addEventListener("click", async (e) => {
    const newNotion = document.querySelector(
      'div[class="notranslate"][contenteditable="true"][placeholder="Type \'/\' for commands"]'
    ) as HTMLDivElement;
    await readClipboard();
  });
}

function creatButton() {
  const bt = document.createElement("button") as HTMLButtonElement;
  bt.innerText = "复制-";
  bt.style.position = "fixed";
  bt.style.bottom = "0px";
  bt.style.right = "0px";
  bt.style.zIndex = "999";
  bt.addEventListener("click", async () => {
    readClipboard();
  });
  document.body.appendChild(bt);
}

async function setClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

async function readClipboard() {
  const item = await navigator.clipboard.read();
  if (item) {
    item.forEach((it) => {
      it.types.forEach(async (ty: any) => {
        const blo = await it.getType(ty);
        console.log(await blo.text());
      });
    });
    console.log("items==>", item);
  }
}

window.onload = getInput;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // alert("前端/后端/Popup收到");
  console.log("sender", message);

  const { dataURL, url, fileName, ...rest } = message;
  sendResponse(555);
  //   file = Ntool.dataURLtoFile(dataURL, fileName),
  //   formData = new FormData();
  // formData.append("file", file);
  // rest.body = formData; // fetch格式

  // // 上传给服务器
  // fetch(url, rest)
  //   .then((res) => res.json()) // fetch需要使用res.json()才能获取到数据
  //   .then((res) => {
  //     if (res.message === "success") {
  //       sendResponse({ status: 0, res });
  //     } else {
  //       sendResponse({ status: -1, res });
  //     }
  //   });
});
