class Validation{
    constructor(el, arr){
        this.form = document.querySelector(el); 
        this.btnSubmit = this.form.querySelector("input[type=submit"); 
        
        arr.forEach(opt =>{
            //btnSubmit버튼을 클릭했을 때 
            this.btnSubmit.addEventListener("click", e=>{
                
                if(opt.type === "text"){
                    if(!this.isTxt(opt.name, opt.len)) e.preventDefault(); 
                }                
                if(opt.type === "email"){                    
                    if(!this.isEmail(opt.name)) e.preventDefault(); 
                }
                if(opt.type === "check"){
                    if(!this.isCheck(opt.name)) e.preventDefault();
                }
                if(opt.type === "select"){
                    if(!this.isSelect(opt.name)) e.preventDefault(); 
                }
                if(opt.type === "password"){
                    if(!this.isPwd(opt.name[0], opt.name[1], opt.len)) e.preventDefault(); 
                } 
            }); 
        })
    }

isTxt(name, len){
    if(len === undefined ) len = 5; 

    //해당 name값의 input요소를 찾음 
    let input = this.form.querySelector(`[name=${name}]`); 
    //해당 input요소의 value값 구함 
    let txt = input.value; 

    //입력받은 value값의 글자수가 len이상이라면 
    if(txt.length >= len){
        //일단 에러메시지 p요소가 있는지 판별 
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        //p요소가 있다면 제거하고 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove(); 

        //true값 반환하여 인증통과 
        return true; 

    //입력받은 value값의 글자수가 len개이상이 아닐경우
    }else{
        //일단 에러메시지 p요소가 있는지 판별 
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        //p요소가 있다면 제거하고 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove(); 

        //p태그로 에러메시지 새로 생성하여 해당 input요소의 부모 td의 뒤쪽에 삽입
        const errMsg = document.createElement("p"); 
        errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`); 
        input.closest("td").append(errMsg); 

        //false값 반환하여 인증 막음 
        return false; 
    }
}


 isEmail(name){

    let input = this.form.querySelector(`[name=${name}]`); 
    let txt = input.value; 

    if(/@/.test(txt)){
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

        return true; 
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p"); 
        errMsg.append("@를 포함한 전체 이미일 주소를 입력하세요."); 
        input.closest("td").append(errMsg); 

        return false; 
    }
}


  isCheck(name){
    let inputs = this.form.querySelectorAll(`[name=${name}]`); 
    let isCheck = false; 

    for(let el of inputs){
        if(el.checked) isCheck = true; 
    }

    if(isCheck){
        const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove(); 
        return true; 

    }else{
        const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) inputs[0].closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("필수 입력 항목을 체크해주세요"); 
        inputs[0].closest("td").append(errMsg); 

        return false; 
    }
}


 isSelect(name){
    let sel = this.form.querySelector(`[name=${name}]`); 
    let sel_index = sel.options.selectedIndex; 
    let val = sel[sel_index].value; 

    if(val !==""){
        const errMsgs = sel.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) sel.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = sel.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) sel.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("항목을 선택해 주세요"); 
        sel.closest("td").append(errMsg); 

        return false; 
    }

}



  isPwd(name1, name2, len){

    let pwd1 = this.form.querySelector(`[name=${name1}]`); 
    let pwd2 = this.form.querySelector(`[name=${name2}]`); 
    let pwd1_val = pwd1.value; 
    let pwd2_val = pwd2.value; 

    const num = /[0-9]/; 
    const eng = /[a-zA-Z]/; 
    const spc = /[~!@#$%^&*()_+?><]/;

    if(pwd1_val === pwd2_val && pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)){

        const errMsgs = pwd1.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = pwd1.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`비밀번호는 ${len}글자 이상, 영문,숫자,특수문자를 포함하여 동일하게 입력하세요`); 
        pwd1.closest("td").append(errMsg); 

        return false; 
    }
}
}
