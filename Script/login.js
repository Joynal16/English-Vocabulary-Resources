document.getElementById("btn-login").addEventListener("click", function () {
  const numberInput = document.getElementById("Number");
  const getNumberInput = numberInput.value;
  console.log(getNumberInput);

  const pinInput = document.getElementById("Pin");
  const getPinInput = pinInput.value;
  console.log(getPinInput);

  if (
    typeof getNumberInput === "string" &&
    getNumberInput == "12345678910" &&
    getPinInput == "1234"
  ) {
    alert("Login Successfully");
    window.location.assign("home.html");
  } else {
    alert("invalid");
    return;
  }
});
