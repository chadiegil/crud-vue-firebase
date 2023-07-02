<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init.js";

const router = useRoute();
const route = useRouter();

const id = ref("");
id.value = router.params.id;
const singleJobPost = ref({
  title: "",
  description: "",
  salary_expected: "",
  location: "",
});

onMounted(async () => {
  const docRef = doc(db, "job_post", id.value);
  const docSnap = await getDoc(docRef);

  console.log(docSnap.data());
  if (docSnap.exists()) {
    singleJobPost.value = docSnap.data();
  } else {
    console.log("No such document");
  }
  //   const updaDoc = doc(db, "job_post", id);
  //   await updateDoc(updaDoc, (singleJobPost.value = docSnap.data()));
});
console.log(singleJobPost.value);

const updatePost = async () => {
  const docRef = doc(db, "job_post", id.value);
  await updateDoc(docRef, singleJobPost.value);
  route.push("/");
};
</script>

<template>
  <div class="container">
    <form class="form">
      <h1>single Job post</h1>
      <div class="input-container">
        <label for="title">Title</label><br />
        <input type="text" v-model="singleJobPost.title" />
        <span> </span>
      </div>
      <div class="input-container">
        <br />
        <label for="title">Description</label><br />

        <input type="text" v-model="singleJobPost.description" />
      </div>
      <div class="input-container">
        <br />
        <label for="salary">Salary Expected</label><br />

        <input type="text" v-model="singleJobPost.salary_expected" />
      </div>
      <div class="input-container">
        <br />
        <label for="location">Location</label><br />

        <input type="text" v-model="singleJobPost.location" />
      </div>

      <button type="submit" class="submit" @click.prevent="updatePost">
        Update
      </button>
    </form>
  </div>
</template>

<style scoped></style>
