<template>
  <div class="psudoCont">
    <base-dialog :show="!!error" title="An error occured!" @close="handelError">
      <p>{{ error }}</p>
    </base-dialog>
    <div class="listcont">
      <coach-filter @filter-coaches="setFilters" class="filter"></coach-filter>
      <div class="action">
        <base-btn
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
          @click="loadCoaches(true)"
          mode="refresh"
          >Refresh
          <font-awesome-icon icon="arrows-rotate" :class="{ icon: hovered }"
        /></base-btn>
      </div>
      <base-spinner v-if="isLoading"></base-spinner>
      <div class="list" v-else-if="hasCoaches">
        <the-list-item
          v-for="coach in coaches"
          :key="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :id="coach.id"
          :areas="coach.areas"
          :description="coach.description"
          :hourRate="coach.hourlyRate"
          :image="coach.Image"
          :button="true"
        ></the-list-item>
      </div>
      <div class="NoItems" v-else>No Items Found.</div>
    </div>
  </div>
</template>

<script>
import TheListItem from "../../components/coaches/TheListItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import BaseDialog from "../../components/UI/BaseDialog.vue";
export default {
  components: {
    TheListItem,
    CoachFilter,
    BaseDialog,
  },
  data() {
    return {
      filter: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: false,
      error: null,
      hovered: false,
    };
  },
  computed: {
    coaches() {
      const Coaches = this.$store.getters["coaches/getCoaches"];
      return Coaches.filter((coach) => {
        if (this.filter.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.filter.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.filter.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(filters) {
      this.filter = filters;
    },
    async loadCoaches(force = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoachesFromServer", {
          forceUpdate: force,
        });
      } catch (error) {
        this.isLoading = false;
        this.error = error.message;
        return;
      }
      this.isLoading = false;
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.listcont,
.NoItems {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
}
.listcont {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  height: 100%;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 30px;
  padding: 10px;
  position: relative;
  align-items: stretch;
}
.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  height: 100%;
  position: relative;
  align-items: stretch;
  width: 100%;
  justify-content: center;
}
@media (max-width: 855px) {
  .listcont {
    flex-direction: column;
  }
}
.action,
.filter {
  position: relative;
  width: 100%;
}
.action {
  border-bottom: 1px solid rgba(51, 51, 51, 0.308);
  padding-bottom: 10px;
}
.NoItems {
  font-weight: bold;
  padding: 10px;
}

.icon {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
