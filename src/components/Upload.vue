<template>
  <div>
    <!--http://up.qiniu.com/-->
    <!--https://up.qbox.me-->
  <form method="post" action="https://up.qbox.me" enctype="multipart/form-data">
  <input name="key" type="hidden" value="demo.jpg">
  <input name="token" type="hidden" value="8qmCfqkpvjGxHQnHUptAccm0cJsgqYHCO6nmLuZJ:CC9jYxxQF_BJvyo4LANViJ4D1Xs=:eyJzY29wZSI6InNoYXJlLWJvb2tzIiwiZGVhZGxpbmUiOjE0Nzk0NjQ0ODJ9">
  <input name="file" type="file"/>
  <button type="submit" >submit </button>
  </form>
  </div>
</template>