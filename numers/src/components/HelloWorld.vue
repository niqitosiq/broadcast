<template>
  <div class="hello">
    <div class="">
      <h3>Утилита для нумерации предложений.</h3>
      <p>
        Введите текст для нумерации в поле ниже
      </p>
      <p class="under">
        Концом предложения считается точка с пробелом, <br>
        а так же "?, !" с пробелом
      </p>
      <textarea @keyup="parse()" v-model="textmodel"></textarea>
      
    </div>
    <div class="prsdt">
      {{ parsedtext }}
    </div>
    <div class="cntner">
      <a href="https://vk.com/niqitosiq" target="_blank" class="autor">
        <span>Автор: </span>
        <img src="../assets/vk.svg" />
      </a>
    </div>
  </div>
</template>

<script>



export default {
  name: 'HelloWorld',
  props: {
  },
  data() {
    return {
      textmodel: "",
      parsedtext: ""
    }
  },
  methods: {
    parse(){
      var text = this.textmodel; 
      var last = "";
      var num = 1;
      var result = "";
      for (var i in text){
        if (num==1){
          result+= ("(1)"+text[i]);
          num+=1;
        } else {
          if (last!="."){
            if (text[i-1]=="." || text[i-1]=="!" || text[i-1]=="?"){
              result += ("(" + num + ")"+text[i]);
              num+=1;
            } else {
              result += text[i];
            }
          }
        }
      }
      this.parsedtext = result;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
p, h3 {
  text-align: center;
}
a {
  color: #2a5885;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
.under {
  font-size: 14px;
  color: gray;
}
.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
}
textarea {
  width: 400px;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.prsdt {
  width: 440px;
}
.cntner {
  height: 50px;
}
.autor {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 25px;
    margin-left: 7px;
  }
}
</style>
