//시간값 넣어주기
// 한국 시간 UTC+9시간
const calcTime = (timestamp) => {
    const curTime = new Date().getTime() - 9*60*60*1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    if(hour>0) return `${hour}시간 전`;
    else if(minute > 0) return `${minute}분 전`;
    else if(second > 0) return `${second}초 전`;
    else if(second == 0) "방금 전";

};

const renderData =(data) => {
    const main = document.querySelector("main");
    data.reverse().forEach(async(obj) => {
        const div = document.createElement("div");
        div.className = "item-list";

        const imgDiv = document.createElement("div");
        imgDiv.className = "item-list__img";

        const img = document.createElement("img");
        const res = await fetch(`/images/${obj.id}`);
        const blob = await res.blob(); //blob을 URL로 변경시켜준다.
        const url = URL.createObjectURL(blob);
        img.src = url;

        const InfoDiv = document.createElement("div");
        InfoDiv.className = "item-list__info";

        const InfoTitleDiv = document.createElement("div");
        InfoTitleDiv.className = "item-list__info-title";
        InfoTitleDiv.innerText = obj.title;

        const InfoMetaDiv = document.createElement("div");
        InfoMetaDiv.className = "item-list__info-meta";
        InfoMetaDiv.innerText = obj.place + calcTime(obj.insertAt);

        const InfoPriceDiv = document.createElement("div");
        InfoPriceDiv.className = "item-list__info-price";
        InfoPriceDiv.innerText = obj.price;

        
        InfoDiv.appendChild(InfoTitleDiv);
        InfoDiv.appendChild(InfoMetaDiv);
        InfoDiv.appendChild(InfoPriceDiv);
        imgDiv.appendChild(img);
        div.appendChild(imgDiv);
        div.appendChild(InfoDiv);
        main.appendChild(div);
    });
};


// 서버로 부터 데이터 받아오기
const fetchList = async() => {
    const accessToken = window.localStorage.getItem("token");
    const res = await fetch('/items',{
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
    });
    
    if(res.status === 401){
        alert("로그인이 필요합니다.");
        window.location.pathname = "/login.html";
        return;
    }
    const data = await res.json();
    renderData(data); //renderData라는 함수에 data를 넘겨줌
};

fetchList();