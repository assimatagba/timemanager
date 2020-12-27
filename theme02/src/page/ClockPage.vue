<template>
  <div id="main-clock-container">
    <b-container>
      <b-row class="clock-container">
        <b-col xl="8" lg="6">
          <h1>{{ timer }}</h1>
          <div class="btn-container">
            <Button
              text="Start clock"
              class="clear m-1 w-100"
              v-on:click="startDateTime === null ? clock() : null"
            />
            <Button
              :text="endDateTime === null ? 'Stop clock' : 'Submit this clock'"
              class="m-1 w-100"
              v-on:click="endTimer"
            />
          </div>
          <div class="btn-container mt-2">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-circle-fill mr-2"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>
            {{ nextWork }}
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Button from "../components/fields/Button";
import store from "@/store/store";
import moment from "moment";

export default {
  name: "ClockPage",
  components: {
    Button,
  },
  props: ["workingTimeId"],
  data: function () {
    return {
      startDateTime: null,
      endDateTime: null,
      clockIn: false,
      timer: "00 : 00 : 00",
      nextWork: null,
      clockFetched: null,
    };
  },
  methods: {
    async submitClock() {
      const workingtimeId = this.$route.params.workingTimeId;
      // let date = new Date(this.endDateTime - this.startDateTime);

      // const converted = `${this.checkTime(
      //   date.getHours() - 1
      // )}:${this.checkTime(date.getMinutes())}:${this.checkTime(
      //   date.getSeconds()
      // )}`;

      const start = new Date(this.startDateTime);
      const end = new Date(this.endDateTime);

      const startStr = `${this.checkTime(start.getFullYear())}-${this.checkTime(
        start.getMonth() + 1
      )}-${this.checkTime(start.getDate())} ${this.checkTime(
        start.getHours()
      )}:${this.checkTime(start.getMinutes())}:${this.checkTime(
        start.getSeconds()
      )}`;
      const endStr = `${this.checkTime(end.getFullYear())}-${this.checkTime(
        end.getMonth() + 1
      )}-${this.checkTime(end.getDate())} ${this.checkTime(
        end.getHours()
      )}:${this.checkTime(end.getMinutes())}:${this.checkTime(
        end.getSeconds()
      )}`;

      let a = moment(startStr);
      let b = moment(endStr);
      let c = Math.round((b.diff(a, "minutes") / 60) * 100) / 100;


      if (
        !this.clockIn &&
        this.startDateTime !== null &&
        this.endDateTime !== null
      ) {
        if (this.clockFetched === null) {
          await this.findActiveClock();

          const data = {
            clockId: this.clockFetched.id,
            clock: {
              time: this.clockFetched.date,
              status: this.clockIn,
              workingtime_id: workingtimeId ? workingtimeId : null,
              hours: c,
              user_id: this.clockFetched.userId,
            },
          };
          await store.dispatch("clock/UPDATE_CLOCK", { data });
        } else {
          const data = {
            clockId: this.clockFetched.id,
            clock: {
              time: this.clockFetched.date,
              status: this.clockIn,
              workingtime_id: workingtimeId ? workingtimeId : null,
              hours: c,
              user_id: this.clockFetched.userId,
            },
          };
          await store.dispatch("clock/UPDATE_CLOCK", { data });
        }
      }
    },
    endTimer() {
      // RESET CLOCK
      if (this.startDateTime !== null && this.endDateTime !== null) {
        this.submitClock().then(() => {
          this.startDateTime = null;
          this.endDateTime = null;
          this.timer = "00 : 00 : 00";
          this.clockFetched = null;
        });
      }
      // STOP
      if (this.startDateTime !== null && this.endDateTime === null) {
        this.clockIn = !this.clockIn;
        this.clock();
      }
    },
    clock() {
      const currentUserId = this.$store.getters["auth/currentUserId"];

      // START WITH NEW DATE
      if (
        this.startDateTime === null &&
        !this.clockIn &&
        this.clockFetched === null
      ) {
        this.startDateTime = Date.now();
        this.clockIn = !this.clockIn; // => true

        const workingtimeId = this.$route.params.workingTimeId;
        const date = new Date(this.startDateTime);
        const converted = `${this.checkTime(
          date.getFullYear()
        )}-${this.checkTime(date.getMonth()) + 1}-${this.checkTime(
          date.getDate()
        )} ${this.checkTime(date.getHours())}:${this.checkTime(
          date.getMinutes()
        )}:${this.checkTime(date.getSeconds())}`;

        const data = {
          userId: currentUserId,
          clock: {
            time: converted,
            status: this.clockIn,
            workingtime_id: workingtimeId ? workingtimeId : null,
            hours: null,
          },
        };
        store.dispatch("clock/CREATE_CLOCK", { data });
      }

      // START WITH EXISTED DATE
      if (
        this.startDateTime === null &&
        !this.clockIn &&
        this.clockFetched !== null
      ) {
        let date = new Date(Date.parse(this.clockFetched.date));
        date.setHours(date.getHours());
        this.startDateTime = date;
        this.clockIn = !this.clockIn; // => true
      }

      // STOP
      if (
        this.startDateTime !== null &&
        !this.clockIn &&
        this.endDateTime === null
      ) {
        // => false
        this.endDateTime = Date.now();
      }
    },
    checkTime(i) {
      return i < 10 ? "0" + i : i;
    },

    async findActiveClock() {
      await store
        .dispatch("clock/GET_CLOCKS_BY_USERID", {
          userId: this.$store.getters["auth/currentUserId"],
        })
        .then((res) => {
          let clocks = [...res.data.data];
          clocks.map((clock) => {
            if (clock.status) {
              this.clockFetched = {
                id: clock.id,
                userId: clock.user_id,
                date: clock.time,
                status: clock.status,
                hours: clock.hours,
                workingtimeId: clock.workingtime_id,
              };
            } else {
              return null;
            }
          });
        });
    },
  },
  async beforeMount() {
    let txt = "";
    let userId = this.$store.getters["auth/currentUserId"];
    let current = await this.$store.dispatch(
      "workingTime/GET_CURRENT_WORKING_TIME",
      { id: userId }
    );
    if (!current.data.data[0]) {
      let next = await this.$store.dispatch(
        "workingTime/GET_NEXT_WORKING_TIME",
        { id: userId }
      );
      if (!next.data.data[0]) {
        txt = "There is no working time planned";
      } else {
        txt =
          "Your next work period is from " +
          moment(next.data.data[0].start).format("DD/MM/YYYY HH:mm") +
          " to " +
          moment(next.data.data[0].end).format("DD/MM/YYYY HH:mm");
      }
    } else {
      txt =
        "Your current work period is from " +
        moment(current.data.data[0].start).format("DD/MM/YYYY HH:mm") +
        " to " +
        moment(current.data.data[0].end).format("DD/MM/YYYY HH:mm");
    }

    this.nextWork = txt;

    await this.findActiveClock();
  },
  mounted() {
    setInterval(() => {
      if (this.startDateTime !== null && this.clockIn) {
        if (this.endDateTime === null) {
          let res = new Date(Date.now() - this.startDateTime);
          this.timer = `${this.checkTime(
            res.getHours() - 1
          )} : ${this.checkTime(res.getMinutes())} : ${this.checkTime(
            res.getSeconds()
          )}`;
        }
      }
    }, 1000);
  },
};
</script>

<style scoped>
#main-clock-container {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.clock-container {
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}

.btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 5vw;
}
</style>
