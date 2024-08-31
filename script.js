const main = {
    check : false,
    calc : document.getElementById("calc"),
    history : document.getElementById("history")
}; 

main.open = () => {
    //event inline at html Code
    main.check ? main.check = false : main.check = true;


        if (main.check) {
            main.history.style.transform="translateX(-3%)"
            main.calc.style.transform="translateX(3%)"
        }else{
            main.history.style.transform="translateX(50%)"
            main.calc.style.transform="translateX(-50%)"
        }


}
// main.open() ;

const calc = {
    input : document.getElementById("input"),
    output : document.getElementById("res")
};

calc.promt = (v)=>{

    calc.input.textContent+=v;
}
calc.rm = ()=>{
    calc.input.textContent = rmLast(calc.input.textContent)
}
calc.exe = ()=>{
    let opp = convert(calc.input.textContent);
    

    
    try {
        if(calc.input.textContent.search(/÷÷/g) != -1) throw "error";
        eval(opp)
    } catch {
        calc.output.innerText = "Mathematical error";
        return;
    }


    let res = eval(opp);
    calc.output.innerText = res;
    opp = convert(opp)
    history.add(opp , res)
}

calc.ca = ()=>{
    calc.input.textContent = ""
}

function rmLast(str) {
    str = str.substring(0, str.length - 1);
    return  str;
}

function convert(str) {
    let arr = []
    arr["×"] = "*";
    arr["÷"] = "/";
    arr["*"] = "×";
    arr["/"] = "÷";
    let res = '';
    for (let i =0 ; i<str.length;i++) {
        if (arr[str[i]] != undefined) {
            res+=arr[str[i]];
        }else{
            res+=str[i];
        }
        
    }

    return res;
}



const history = {
    res : [],
    opp : "+"   ,
    lastEle :[],
    contaner : document.getElementById('recent')
};

history.add = (opp,res)=>{
    
    if(!check([opp,res])) return ;
    history.res.push(res)
    let ele = `<div onclick="calc.promt(${res})"><h3>${opp}</h3><p>${res}</p></div>`
    history.contaner.innerHTML += ele
    history.lastEle = [opp,res]
    history.total();
}

function check(arr) {
    
    if (history.lastEle[0] == arr[0] && history.lastEle[1] == arr[1]) {
        return false;
    } else {
        return true;
    }
}



history.total = ()=>{
    let res  = 0

    
    for (let i = 0; i < history.res.length; i++) {

        res = eval(`${history.res[i]}${history.opp}${res}`)
        
    }
    
    document.getElementById("recent-res").innerText=res;
}


history.ca = ()=>{
    history.contaner.innerHTML = ""
    document.getElementById("recent-res").innerText = 0;
    history.res = []
    calc.output.innerText = 0;
    calc.input.textContent = ""

}





document.body.onload = ()=>{
    document.body.style.display="block";
   document.body.onresize=()=>{
        if (window.innerWidth > 600) {
            document.getElementById("alert").style.display="none"
        } else {
            document.getElementById("alert").style.display="block"
        }
    }    
    if (window.innerWidth > 600) {
        document.getElementById("alert").style.display="none"
    } else {
        document.getElementById("alert").style.display="block"
    }
}













