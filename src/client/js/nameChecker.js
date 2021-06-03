function checkForName(str) {
    console.log("::: Running checkForName :::", str);
    const r = new RegExp(/^(http|https):\/\/[^ "]+$/);
    if (r.test(str)) {
      console.log("URL check passed")
      return true;
     }
     else {
       console.log("URL check failed")
       return false;
  }
}

export { checkForName }