<template>
  <div id="skills" class="section">
    <h2>
      <span>我的技能</span>
    </h2>
    <ul>
      <li>
        <router-link to="/about/#skill1">skill1</router-link>
      </li>
      <li>
        <router-link to="/about/#skill2">skill3</router-link>
      </li>
      <li>
        <router-link to="/about/#skill3">skill4</router-link>
      </li>
    </ul>
    <ul class="detail">
      <li id="skill1">HTML</li>
      <li id="skill2">CSS</li>
      <li id="skill3">JavaScript</li>
    </ul>
    <div class="other"></div>
  </div>
</template>

<script>
export default {
  name: "Skills"
};
</script>

<style scoped>
h2 {
  font-size: 20px;
  color: #d9534f;
  text-align: center;
  padding: 18px 0 18px 0;
  margin: 0 0 10px 0;
}
ul {
  text-align: left;
}
.detail li {
  margin-bottom: 15px;
  font-weight: bold;
  height: 100px;
}
.other {
  height: 1000px;
}
</style>
