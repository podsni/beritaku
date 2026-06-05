/* eslint-disable no-console, no-control-regex */
function main() {
  const base64Str =
    "CBMivgFBVV95cUxNT0J5QjZfZVhSUGV4WWlqZXZEdFhHZlBTa2JZQS1LeXBtaExKd0xvMXRmWVFUX040cUtZUFF5YzZsY2dfM3BIZHNJTm5ZNkNja190WFZ6UFNUUFY0TTVjc2lrQmFib08zWmY0cFQ1cEt2ekp0aHRBalVra1JiaVdYYklxUTdXQ1FnVXh4UnJoSHRIZzZQT0VJbmNydnZrTjZsS2ZQeWhvcFl5cmMwbXRFQnIwTUNpYi1sRVkwWkVn0gHDAUFVX3lxTE9sN0hyVndsalBQYW9UT3RkcllwekFvVlFlSGNXa2JaLXhDUFBTQV94dGI0MkJUTFJJdjY4WlVQZEttdjkwanI3b2VoekVQQm5odTNzbmItNnQ3Wk52RV9rSldDU3RrQ0Jzc3V0NUxFbG5vQnI3dndyczJQeDN0c0VFS2t0Zk50RmlWdGxxdkJvNFlLRTFTVldPeHNoY1NITWJjd0NXZ0xMb29wLTJsRTdnZlR4bjh4YXJUOVJkTEdEWnJGMA";

  // Replace base64url characters to standard base64 if needed
  const normalized = base64Str.replace(/-/g, "+").replace(/_/g, "/");
  const buffer = Buffer.from(normalized, "base64");

  console.log("Decoded buffer as UTF-8 string:");
  console.log(buffer.toString("utf-8"));

  console.log("\nDecoded buffer as ascii string:");
  console.log(buffer.toString("ascii"));

  // Let's print any URL matched in the buffer
  const matches = buffer
    .toString("utf-8")
    .match(/https?:\/\/[^\s"'<>\x00-\x1F]+/g);
  console.log("Matched URLs:", matches);
}

main();
