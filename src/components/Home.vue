<script setup>
import { ref, onMounted } from "vue";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/init.js";
import { useRouter, useRoute } from "vue-router";

const title = ref("");
const location = ref("");
const salary_expected = ref("");
const description = ref("");
const jobs = ref([]);
const isEdit = ref(false);

const router = useRouter();

const handleSubmit = async () => {
  const colRef = collection(db, "job_post");
  const dataObj = {
    title: title.value,
    description: description.value,
    salary_expected: salary_expected.value,
    location: location.value,
  };
  await addDoc(colRef, dataObj);
  title.value = "";
  location.value = "";
  salary_expected.value = "";
  description.value = "";
  fetchJobs();
};

const fetchJobs = async () => {
  const querySnapShot = await getDocs(collection(db, "job_post"));

  const jobsLocal = [];

  querySnapShot.forEach((doc) => {
    const jobPost = {
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      salary_expected: doc.data().salary_expected,
      location: doc.data().location,
    };
    jobsLocal.push(jobPost);
  });
  jobs.value = jobsLocal;
};
//  Edit Post
const editJob = async (id) => {
  //   isEdit.value = true;
  //   const docRef = doc(db, "job_post", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     title.value = docSnap.data().title;
  //     description.value = docSnap.data().description;
  //     salary_expected.value = docSnap.data().salary_expected;
  //     location.value = docSnap.data().location;
  //   } else {
  //     console.log("No such document");
  //   }
  //   const updaDoc = doc(db, "job_post", id);
  //   await updateDoc(updaDoc, {
  //     title: title.value,
  //     description: description.value,
  //     salary_expected: salary_expected.value,
  //     location: location.value,
  //   });
  router.push("/job-post/" + id);
};
// Delete post
const deleteJob = async (id) => {
  const confirmed = confirm(
    `Are you sure you want to delete this Job post? ${id}`
  );
  if (confirmed) {
    await deleteDoc(doc(db, "job_post", id));
    fetchJobs();
  } else {
    // Handle the cancellation logic here (e.g., display a message or perform any other action)
    console.log("Delete operation canceled");
  }
};

onMounted(() => {
  fetchJobs();
});
</script>

<template>
  <div>
    <div class="container">
      <h1>Vue - Firebase</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <div class="form-control">
            <label for="title">Title</label>

            <input type="text" v-model="title" />
          </div>
        </div>
        <div class="form-group">
          <div class="form-control">
            <label for="description">Description</label>

            <input type="text" v-model="description" />
          </div>
        </div>
        <div class="form-group">
          <div class="form-control">
            <label for="salary_expected">Salary Expected</label>

            <input type="text" v-model="salary_expected" />
          </div>
        </div>
        <div class="form-group">
          <div class="form-control">
            <label for="location">Location</label>

            <input type="text" v-model="location" />
          </div>
        </div>
        <button type="submit">Submit</button>
        <!-- <button type="submit" v-if="isEdit" @click="editJob">Update</button> -->
      </form>

      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Salary Expected</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="job in jobs" :key="job.id">
              <td>{{ job.id }}</td>
              <td>{{ job.title }}</td>
              <td>{{ job.description }}</td>
              <td>{{ job.salary_expected }}</td>
              <td>{{ job.location }}</td>

              <button @click="editJob(job.id)" class="btn btn-info">
                edit
              </button>
              <button @click="deleteJob(job.id)" class="btn btn-danger">
                delete
              </button>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
