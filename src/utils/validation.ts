interface IValidator {
  fullnameOnChange: Function,
  emailOnChange: Function,
  phoneOnChange: Function
}

const Validator:IValidator = {
  fullnameOnChange: (name:string):string => {
    name = name.replace(/[^a-zA-Z ]| +(?= )/g,"").toUpperCase();
    if(name.length > 61){
      name = name.slice(0, 61)
    }
    return name
  },
  emailOnChange: (email:string):string => {
    email = email.trim();
    email = email.replace(/[^a-zA-Z0-9@.]/g,"")
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
  }
}

export default Validator