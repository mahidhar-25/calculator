<template>
    <header>
        <h1>వడ్డీ కాలిక్యులేటర్</h1>
    </header>
    <div class="card">
        <div>
            <form @submit.prevent="calculate">
                <div class="form-group">
                    <label for="principal_amount">అసలు మెుత్తం(S.I)</label>
                    <input
                        type="number"
                        class="form-control"
                        id="principal_amount"
                        v-model.trim="principal"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="intrest">వడ్డీ రేటు (%)(I)</label>
                    <select
                        name="intrest"
                        id="intrest"
                        class="form-control"
                        v-model.trim="intrest"
                        required
                    >
                        <option disabled value="">ఎంచుకోండి</option>
                        <option
                            v-for="rate in interestRates"
                            :key="rate"
                            :value="rate"
                        >
                            {{ rate }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="cummulative"
                        >సంచిత రేటు (సంవత్సరాలు)(C.I in Y)</label
                    >
                    <select
                        name="cummulative"
                        id="cummulative"
                        class="form-control"
                        v-model.trim="cummulative"
                    >
                        <option disabled value="">ఎంచుకోండి</option>
                        <option
                            v-for="period in cumulativePeriods"
                            :key="period"
                            :value="period"
                        >
                            {{ period }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="from_date">ఇచ్చిన తేదీ(G.D)</label>
                    <input
                        type="date"
                        class="form-control"
                        id="from_date"
                        v-model.trim="from_date"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="to_date">తీసుకున్న తేదీ(A.D)</label>
                    <input
                        type="date"
                        class="form-control"
                        id="to_date"
                        v-model.trim="to_date"
                        required
                    />
                </div>
                <div class="form-group">
                    <button type="submit">లెక్కించు</button>
                </div>
            </form>
            <div v-if="errormessage" class="error-message">
                <p>వివరాలు అన్నింటినీ నింపి ఫారం సబ్మిట్ చేయండి.</p>
                <p>ప్రారంభ తేదీ ముగింపు తేదీ కంటే తక్కువగా ఉండాలి.</p>
            </div>

            <div v-if="display_details" class="table-wrapper">
                <table class="details-table">
                    <thead>
                        <tr>
                            <th>సంచిత కాలం (సంవత్సరాలు)</th>
                            <th>ఆరంభ తేదీ</th>
                            <th>అసలు మెుత్తం</th>
                            <th>వడ్డీ</th>
                            <th>మొత్తం డబ్బు</th>
                            <th>ముగింపు తేదీ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="detail in compoundingDetails"
                            :key="detail.period"
                        >
                            <td>{{ detail.period }}</td>
                            <td>{{ formatDate(detail.startDate) }}</td>
                            <td>{{ detail.principal.toFixed(2) }}</td>
                            <td>{{ detail.interest.toFixed(2) }}</td>
                            <td>
                                {{
                                    (
                                        detail.principal + detail.interest
                                    ).toFixed(2)
                                }}
                            </td>
                            <td>{{ formatDate(detail.endDate) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div v-if="display_details">
                <p>
                    <b>మొత్తం సమయం : </b>
                    {{ convertTimeToTelugu(totalTime) }}
                </p>
                <p v-if="parseInt(cummulative) === 0">
                    <b>ఒక రోజు వడ్డీ :</b>
                    {{ (total_interest_amount / totalDays).toFixed(2) }}
                </p>
                <p><b>మొత్తం వడ్డీ:</b> {{ total_interest_amount }}</p>
                <p><b>మొత్తం డబ్బు:</b> {{ total_amount }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            totalDays: 0,
            totalTime: "",
            principal: "",
            cummulative: 0,
            intrest: "",
            to_date: "",
            from_date: "",
            intrest_amount_months: 0,
            intrest_amount_days: 0,
            total_amount: 0,
            total_interest_amount: 0,
            diffDays: 0,
            diffmonths: 0,
            diffYears: 0,
            display_details: false,
            errormessage: false,
            simple_interest_details: [],
            interestRates: [0.5, 1, 1.5, 2, 2.5, 3],
            cumulativePeriods: [0, 1, 3], // Assuming cumulative is in years (1 or 3)
            compoundingDetails: [],
        };
    },
    methods: {
        convertTimeToTelugu(timeString) {
            // Extract the values for years (y), months (m), and days (d) using regular expressions
            let timePattern = /(\d+)y\s+(\d+)m\s+(\d+)d/;
            let match = timeString.match(timePattern);

            if (match) {
                let years = match[1];
                let months = match[2];
                let days = match[3];

                // Create the Telugu translation
                let teluguTranslation = `${years} సంవత్సరాలు ${months} నెలలు ${days} రోజులు`;
                return teluguTranslation;
            } else {
                return "Invalid input format";
            }
        },
        formatDate(dateString) {
            const options = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            };
            return new Date(dateString).toLocaleDateString("en-GB", options);
        },
        parseDate(date) {
            return new Date(date);
        },

        getDateDifference(start, end) {
            const startDate = this.parseDate(start);
            if (end === "") {
                end = new Date();
            }
            const endDate = this.parseDate(end);
            let years = endDate.getFullYear() - startDate.getFullYear();
            let months = endDate.getMonth() - startDate.getMonth();
            let days = endDate.getDate() - startDate.getDate();

            if (days < 0) {
                months--;
                const previousMonth = new Date(
                    endDate.getFullYear(),
                    endDate.getMonth(),
                    0
                ).getDate();
                days += previousMonth;
            }

            if (months < 0) {
                years--;
                months += 12;
            }

            const totalTime = `${years}y ${months}m ${days}d`;

            const completeYears = parseFloat(
                (years + months / 12 + days / 365).toFixed(3)
            );
            const completeMonths = parseFloat(
                (years * 12 + months + days / 30).toFixed(3)
            );
            const completeDays = Math.floor(
                (endDate.getTime() - startDate.getTime()) /
                    (1000 * 60 * 60 * 24)
            );

            return {
                years,
                months,
                days,
                totalTime,
                completeYears,
                completeMonths,
                completeDays,
            };
        },

        calculateCompoundInterest() {
            let principal = this.principal;
            let interestRate = this.intrest;
            let startDate = new Date(this.from_date);
            let endDate = new Date(this.to_date);
            let forNoOfYears = this.cummulative;
            let compounded = this.cummulative !== 0 ? true : false;
            console.log(compounded, this.cummulative);

            const start = new Date(startDate);
            const end = endDate ? new Date(endDate) : new Date();
            const dateDiff = this.getDateDifference(start, end);
            this.totalTime = dateDiff.totalTime;
            this.totalDays = dateDiff.completeDays;
            if (!compounded) {
                const simpleInterestDetail = this.calculateSimpleInterest(
                    principal,
                    interestRate,
                    dateDiff.completeYears
                );
                this.total_interest_amount =
                    simpleInterestDetail.interest.toFixed(2);
                this.total_amount = parseFloat(
                    parseFloat(simpleInterestDetail.principal) +
                        parseFloat(this.total_interest_amount)
                ).toFixed(2);
                return {
                    compounded: false,
                    principal: parseFloat(
                        simpleInterestDetail.principal.toFixed(2)
                    ),
                    interest: parseFloat(
                        simpleInterestDetail.interest.toFixed(2)
                    ),
                    endDate,
                    startDate,
                    compoundingDetails: [
                        {
                            period: 1,
                            startDate: start.toISOString(),
                            endDate: end.toISOString(),
                            principal: parseFloat(
                                simpleInterestDetail.principal.toFixed(2)
                            ),
                            interest: parseFloat(
                                simpleInterestDetail.interest.toFixed(2)
                            ),
                        },
                    ],
                };
            }

            let currentPrincipal = principal;
            let totalInterest = 0;
            const compoundingDetails = [];
            let currentStartDate = start;
            let period = 1;

            const timeInterval = forNoOfYears;

            while (currentStartDate < end) {
                const nextStartDate = new Date(currentStartDate);
                nextStartDate.setFullYear(
                    nextStartDate.getFullYear() + Math.floor(timeInterval)
                );
                nextStartDate.setMonth(
                    nextStartDate.getMonth() + (timeInterval % 1) * 12
                );

                if (nextStartDate > end) {
                    break;
                }
                const simpleInterest = this.calculateSimpleInterest(
                    currentPrincipal,
                    interestRate,
                    timeInterval
                );
                currentPrincipal += simpleInterest.interest;

                compoundingDetails.push({
                    period: period++,
                    startDate: currentStartDate.toISOString(),
                    endDate: nextStartDate.toISOString(),
                    principal: parseFloat(simpleInterest.principal.toFixed(2)),
                    interest: parseFloat(simpleInterest.interest.toFixed(2)),
                });

                currentStartDate = nextStartDate;
            }

            // Calculate interest for the remaining period if any
            const remainingTimeInYears = this.getDateDifference(
                currentStartDate,
                end
            );
            if (remainingTimeInYears.completeYears > 0) {
                console.log({
                    remainingTimeInYears,
                    end: end.toISOString(),
                    current: currentStartDate.toISOString(),
                    currentPrincipal: currentPrincipal,
                });
                const simpleInterest = this.calculateSimpleInterest(
                    currentPrincipal,
                    interestRate,
                    remainingTimeInYears.completeYears
                );
                //currentPrincipal += simpleInterest.interest;

                compoundingDetails.push({
                    period: period++,
                    startDate: currentStartDate.toISOString(),
                    endDate: end.toISOString(),
                    principal: parseFloat(currentPrincipal.toFixed(2)),
                    interest: parseFloat(simpleInterest.interest.toFixed(2)),
                });
            }

            compoundingDetails.forEach((detail) => {
                totalInterest += detail.interest;
            });

            this.total_interest_amount = parseFloat(totalInterest.toFixed(2));
            this.total_amount = parseFloat(
                parseFloat(principal) + parseFloat(this.total_interest_amount)
            ).toFixed(2);
            return {
                compounded: true,
                principal: parseFloat(principal.toFixed(2)),
                interest: parseFloat(totalInterest.toFixed(2)),
                startDate: start.toISOString(),
                endDate: end.toISOString(),
                compoundingDetails: compoundingDetails,
            };
        },

        calculateSimpleInterest(principal, rate, time) {
            const interest = (principal * rate * 12 * time) / 100;
            return {
                principal,
                rate,
                time,
                interest,
            };
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
                years: years + months / 12 + days / 365, // Fractional years for partial periods
            };
        },

        clearAll() {
            this.totalDays = 0;
            this.totalTime = "";
            this.intrest_amount_months = 0;
            this.intrest_amount_days = 0;
            this.total_amount = 0;
            this.total_interest_amount = 0;
            this.diffDays = 0;
            this.diffmonths = 0;
            this.diffYears = 0;
            this.display_details = false;
            this.errormessage = false;
            this.simple_interest_details = [];
            this.compoundingDetails = [];

            console.log("clear all called");
        },
        calculate() {
            this.clearAll();
            // Input Validation
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

            if (new Date(this.to_date) < new Date(this.from_date)) {
                this.errormessage = true;
                this.display_details = false;
                return;
            }

            this.errormessage = false;
            this.display_details = true;

            this.compoundingDetails =
                this.calculateCompoundInterest().compoundingDetails;

            // Calculate interest for remaining months and days
            //const remainingYears = dateDiff.years - Math.floor(dateDiff.years);
            //const remainingMonths = Math.floor(remainingYears * 12);
            // const remainingDays = Math.floor(
            //     (remainingYears * 12 - remainingMonths) * 30
            // );

            // this.intrest_amount_months =
            //     ((parseFloat(this.principal) * parseFloat(this.intrest)) /
            //         100) *
            //     (this.diffmonths / 12);
            // this.intrest_amount_days =
            //     ((parseFloat(this.principal) * parseFloat(this.intrest)) /
            //         100) *
            //     (this.diffDays / 365);
            // this.total_intrest =
            //     this.intrest_amount_days +
            //     this.intrest_amount_months +
            //     this.simple_interest_details.reduce(
            //         (acc, detail) => acc + detail.interestAmount,
            //         0
            //     );
            // this.total_amount = parseFloat(this.principal) + this.total_intrest;
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
    font-family: "Roboto", sans-serif;
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

.table-wrapper {
    max-width: 60rem; /* Restricts table width to 60rem */
    overflow-x: auto; /* Enables horizontal scrolling */
    margin: 0 auto; /* Centers the table wrapper */
}

.details-table {
    width: 100%; /* Ensures the table takes full width of its container */
    border-collapse: collapse; /* Better table structure */
}

.details-table th,
.details-table td {
    padding: 1rem;
    text-align: left;
    border: 1px solid #ddd; /* Optional: Adds borders to cells */
    white-space: nowrap; /* Prevents text wrapping */
}

button:hover,
button:active {
    background-color: #af0a78;
    border-color: #af0a78;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}

.card {
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
    margin: 2rem auto;
    max-width: 60rem;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
}

input,
select {
    display: block;
    width: 100%;
    font: inherit;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input:focus,
select:focus {
    outline: none;
    border-color: #3a0061;
    background-color: #f7ebff;
}

.form-control {
    margin: 1rem 0;
}

.error-message {
    color: red;
    margin-top: 1rem;
}

.details-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

.details-table th,
.details-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

.details-table th {
    background-color: #f2f2f2;
    font-weight: bold;
}

.summary {
    margin-top: 1rem;
}

.summary p {
    font-size: 1rem;
    margin: 0.5rem 0;
}
</style>
