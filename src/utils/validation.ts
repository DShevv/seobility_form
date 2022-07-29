interface IValidator {
  fullnameOnChange: Function,
  emailOnChange: Function,
  phoneOnChange: Function,
  fullnameIsInvalid: Function,
  emailIsInvalid:Function,
  phoneIsInvalid:Function,
  messageIsInvalid: Function
}

interface IValidOut {
  result: boolean,
  message?: string
}

const Validator:IValidator = {
  fullnameOnChange: (event:React.ChangeEvent<HTMLInputElement>):string => {
    let name:string = event.target.value;
    name = name.replace(/[^a-zA-Z ]| +(?= )/g,"").toUpperCase();
    if(name.length > 61){
      name = name.slice(0, 61)
    }
    return name
  },
  emailOnChange: (event:React.ChangeEvent<HTMLInputElement>):string => {
    let email = event.target.value;
    email = email.replace(/[^a-zA-Z0-9+@.]/g,"")
    return email
  },
   phoneOnChange: (event:React.ChangeEvent<HTMLInputElement>):string => {
 
    let cursorStart = event.target?.selectionStart,
        numbers = event.target.value.replace(/\D/g,""),
        phone = "";
    if(!numbers) {
      return phone
    }

    if(event.target.value.length !== cursorStart){
        if (event.target.value.match(/[^0-9 +()-]/g) !== null){
          numbers =  event.target.value.replace(/\D/g,"")
        }
        else if(event.target.value.length <= 17){
          return event.target.value;
        }
        
    }

    if (['7', '8', '9'].includes(numbers[0])){
      if( numbers[0] === "9") {
        numbers = "7" + numbers;
      }
      let startNumb = numbers[0] === "7" ? "+7" : "8";
      phone = startNumb + " ";
      if (numbers.length > 1){
        phone += "(" + numbers.substring(1,4)
      }
      if (numbers.length >= 5) {
        phone += ") " + numbers.substring(4,7);
      }
      if (numbers.length >= 8) {
        phone += '-' + numbers.substring(7,9);
      }
      if (numbers.length >= 10) {
        phone += '-' + numbers.substring(9,11);
      }
    }
    else{
      phone = "+" + numbers
    }
    event.target.selectionStart = cursorStart;
    return phone;
  },

  fullnameIsInvalid: (name:string):IValidOut =>{
    const res = {result:false, message: ""};
    const words:string[] = name.trim().split(" ");

    if (words.length !== 2) {
      res.message =  "Fullname must be 2 words";
      res.result = true;
    }
    words.forEach(elem => {
      if (elem.length < 3 ){
        res.message =  "Minimum length of word is 3 character";
        res.result = true;
      }
      if (elem.length > 30 ){
        res.message =  "Maximum length of word is 30 characters";
        res.result = true;
      }
    })
    return res
  },

  emailIsInvalid: (email:string):IValidOut => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const res = {result:false, message: ""};
    if (!regex.test(email)) {
      res.message =  "Email is invalid";
      res.result = true;
    }

    return res;
  },

  phoneIsInvalid: (phone:string):IValidOut => {
    const res = {result:false, message: ""};

    if (phone[0] === "+" && phone[1] !== " " && phone[2] !== " " ){
      return res
    }
    if (phone[0] === "+" && phone.length < 18){
      res.result = true;
      res.message = "Phone number shoud be 18 characters length";
    }
    if (phone[0] !== "+" && phone.length < 17){
      res.result = true;
      res.message = "Phone number shoud be 17 characters length";
    }
    


    return res
  },

  messageIsInvalid: (message:string):IValidOut => {
    const res = {result:false, message: ""};
    
    if(message.length < 10){
      res.message =  "Minimum length of message is 10 characters";
      res.result = true;
    }
    
    return res;
  }
}

export default Validator