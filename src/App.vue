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
                    <select
                        name="intrest"
                        id="cars"
                        class="form-control"
                        v-model.trim="intrest"
                    >
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <!-- <div class="form-group">
                    <label for="cummulative">సంచిత రేటు</label>
                    <select
                        name="cummulative"
                        id="cars"
                        class="form-control"
                        v-model.trim="cummulative"
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="3">3</option>
                    </select>
                </div> -->
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

                <div
                    v-for="detail in compound_details"
                    :key="detail.cumulativeYear"
                >
                    <h3>{{ detail.cumulativeYear }} సంవత్సరానికి వివరాలు:</h3>
                    <p>
                        <strong>మొదటి మొత్తం : </strong
                        >{{ detail.principalAmount }}
                    </p>
                    <p>
                        <strong>వడ్డీ మొత్తం : </strong
                        >{{ detail.interestAmount }}
                    </p>
                    <p>
                        <strong>మొత్తం డబ్బు : </strong>{{ detail.totalAmount }}
                    </p>
                </div>

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
            cummulative: "",
            intrest: "",
            to_date: "",
            from_date: "",
            intrest_amount_months: 0,
            intrest_amount_days: 0,
            total_amount: 0,
            diffDays: 0,
            diffmonths: 0,
            diffYears: 0,
            display_details: false,
            errormessage: false,
            compound_details: [],
        };
    },
    methods: {
        /*
      A = P(1 + r/n)nt
      
      */
        CompoundInterest() {
            let principalAmount = 0;
            let interestAmount = 0;
            for (let i = 0; i < this.diffYears; i = i + this.cummulative) {
                if (i === 0) {
                    principalAmount = this.principal;
                }
                principalAmount += interestAmount;
                principalAmount = this.principal;
                let r = this.interest;
                let n = 1 / this.cummulative;
                let t = this.cummulative;
                interestAmount =
                    principalAmount * Math.pow(1 + r / n, n * t) -
                    principalAmount;
                let totalAmount = principalAmount + interestAmount;

                this.compound_details.push({
                    principalAmount,
                    interestAmount,
                    totalAmount,
                    cumulativeYear: i * this.cummulative,
                });
            }
        },

        getDateDiff(
            startDate = new Date(this.from_date),
            endDate = new Date(this.to_date)
        ) {
            const totalDays = Math.floor(
                (endDate - startDate) / (1000 * 60 * 60 * 24)
            );
            let years = endDate.getFullYear() - startDate.getFullYear();
            let months = endDate.getMonth() - startDate.getMonth();
            let days = endDate.getDate() - startDate.getDate();

            if (days < 0) {
                months--;
                days += new Date(
                    endDate.getFullYear(),
                    endDate.getMonth(),
                    0
                ).getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }
            const totalMonths = years * 12 + months;
            return {
                months: totalMonths,
                days: days,
                totalDays: totalDays,
                years: years,
            };
        },
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
            let dateDiff = this.getDateDiff();
            this.diffDays = dateDiff.days;
            this.diffmonths = dateDiff.months;
            this.diffYears = dateDiff.years;
            if (this.cummulative !== "0") {
                this.CompoundInterest();
            }
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
