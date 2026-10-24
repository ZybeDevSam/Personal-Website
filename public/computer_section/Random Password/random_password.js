
function generateRandomPassword() { //, includeLower, includeUpper, includeNums, includeSpec
  length = parseInt(document.getElementById("length").value, 10);
  const includeSpecial = document.getElementById("includeSpecial").checked;
  const includeUpper = document.getElementById("includeUpper").checked;
  const includeNums = document.getElementById("includeNums").checked;
  let charset = "abcdefghijklmnopqrstuvwxyz";
  // let testset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
  const charsetLower = "abcdefghijklmnopqrstuvwxyz";
  const charsetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsetNums = "0123456789";
  const charsetSpec = "!@#$%^&*()_+";

  // if(includeLower) charset += charsetLower;
  if(includeUpper) charset += charsetUpper;
  if(includeNums) charset += charsetNums
  if(includeSpecial) charset += charsetSpec;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  console.log(password);
  document.getElementById("password").textContent = "Generated Password: " + password;
}
