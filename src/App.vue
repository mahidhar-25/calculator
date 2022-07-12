<template>
  <header>
    <h1>వడ్డీ కాలిక్యులేటర్</h1>
  </header>
  <!-- <div class="center"> -->
  <div class="card">
    <div>
      <form @submit.prevent="calculate">
        <div class="form-group">
          <label for="principal_amount">అసలు మెుత్తం</label>
          <input
            type="number"
            class="form-control"
            id="principal_amount"
            v-model.trim="principal"
          />
        </div>
        <div class="form-group">
          <label for="intrest">వడ్డీ రేటు</label>
          <!-- <input
            type="d"
            class="form-control"
            id="intrest"
            v-model.trim="intrest"
          /> -->
          <select name="intrest" id="cars" class="form-control" v-model.trim="intrest">
           <option value="0.5">0.5</option>
  <option value="1">1</option>
  <option value="1.5">1.5</option>
  <option value="2">2</option>
</select>
        </div>
        <div class="form-group">
          <label for="from_date">ఇచ్చిన తేదీ</label>
          <input
            type="date"
            class="form-control"
            id="from_date"
            v-model.trim="from_date"
          />
        </div>
        <div class="form-group">
          <label for="to_date">తీసుకున్న తేదీ</label>
          <input
            type="date"
            class="form-control"
            id="to_date"
            v-model.trim="to_date"
          />
        </div>
        <div class="form-group">
          <button type="submit">లెక్కించు</button>
        </div>
      </form>
      <div v-if="errormessage">
        <p>వివరాలు అన్నింటినీ నింపి ఫారం సబ్మిట్ చేయండి.</p>
      </div>

      <div v-if="display_details">
        <p>
          <strong>మొత్తం నెలలు: </strong>{{ diffmonths }} నెలలు
          {{ diffDays }} రోజులు
        </p>
        <p>
          <strong>{{ diffmonths }} నెలలు వడ్డీ : </strong>
          {{ intrest_amount_months }}
        </p>
        <p>
          <strong>{{ diffDays }} రోజులు: వడ్డీ </strong
          >{{ intrest_amount_days }}
        </p>
        <p><strong>మొత్తం వడ్డీ : </strong>{{ total_intrest }}</p>
        <p><strong>మొత్తం డబ్బు : </strong>{{ total_amount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      principal: "",
      intrest: "",
      to_date: "",
      from_date: "",
      intrest_amount_months: 0,
      intrest_amount_days: 0,
      total_amount: 0,
      diffDays: 0,
      diffmonths: 0,
      display_details: false,
      errormessage: false,
    };
  },
  methods: {
    calculate() {
      if (
        this.principal === "" ||
        this.intrest === "" ||
        this.to_date === "" ||
        this.from_date === ""
      ) {
        this.errormessage = true;
        this.display_details = false;
        return;
      }
      this.errormessage = false;
      this.display_details = true;
      var startDateStr = this.from_date;
      var endDateStr = this.to_date;

      const date1 = new Date(startDateStr);
      const date2 = new Date(endDateStr);

      var months;
      months = (date2.getFullYear() - date1.getFullYear()) * 12;

      months -= date1.getMonth();
      months += date2.getMonth();
      this.diffmonths = months;
      var dates;
      dates = (date2.getFullYear() - date1.getFullYear()) * 1;
      var extra_dates = dates;
      dates -= date1.getDate();
      dates += date2.getDate();
      dates -= extra_dates;
      this.diffDays = dates;
      this.intrest_amount_months = Math.floor(
        (this.principal * +this.intrest * this.diffmonths) / 100
      );
      this.intrest_amount_days = Math.floor(
        (this.principal * +this.intrest * this.diffDays) / (100 * 30)
      );
      this.total_intrest =
        this.intrest_amount_days + this.intrest_amount_months;
      this.total_amount = this.principal + this.total_intrest;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  background-color: #880017;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

button {
  font: inherit;
  border: 1px solid #88005b;
  background-color: #88005b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin: 1rem;
  width: 12rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

button:focus {
  outline: none;
}

button:hover,
button:active {
  background-color: #af0a78;
  border-color: #af0a78;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}
.center {
  width: 100vw;
}
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  padding-bottom: 0;
  margin: 2rem auto;
  margin-bottom: 0;
  max-width: 37rem;
  max-height: max-content;
}

.inputbox {
  margin: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
