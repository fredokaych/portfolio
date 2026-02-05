function checkPalindrome() {
  const input = document.getElementById("palInput").value;
  const result = document.getElementById("palResult");

  const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");

  if (!input) {
    result.textContent = "Please enter a word.";
    return;
  }

  result.textContent =
    cleaned === reversed
      ? "Yes, it's a palindrome!"
      : "No, not a palindrome.";
}
