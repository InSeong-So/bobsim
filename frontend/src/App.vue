<template>
  <div id="app">
    <div class="row">
      <div class="leftMenu">
        <div class="hamburger active">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul class="leftMenuList">
          <li>
            <a href="#" class="dropdown">
              <i class="fa fa-home fa-2x" aria-hidden="true"></i>
              <span>OASISSECURITY</span>
            </a>
            <ul class="dropdownlist">
              <li>
                <a href="#">
                  <span>USERROLES</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>USERSANDSESSIONS</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>FUNCTIONDEFINISIONS</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>GENERALSETUP</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" class="dropdown">
              <i class="fa fa-table fa-2x" aria-hidden="true"></i>
              <span>PATIENTMASTERINDEX</span>
            </a>
            <ul class="dropdownlist">
              <li>
                <a href="#">
                  <span>PATIENTDEATHREGISTRATION</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i class="fa fa-bed fa-2x" aria-hidden="true"></i>
              <span>QAYSRA</span>
            </a>
          </li>
          <li>
            <a href="#" class="dropdown">
              <i class="fa fa-user-md fa-2x" aria-hidden="true"></i>
              <span>PHDBMISC</span>
            </a>
            <ul class="dropdownlist">
              <li>
                <a href="#">
                  <span>OBOOKING</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>ORDSERVC</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" class="dropdown">
              <i class="fa fa-heartbeat fa-2x" aria-hidden="true"></i>
              <span>PHDREP</span>
            </a>
            <ul class="dropdownlist">
              <li>
                <a href="#" class="dropdown">
                  <span>PHDMDREP</span>
                </a>
                <ul class="dropdownlist">
                  <li>
                    <a href="#">
                      <span>MEDREP1</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>MEDREP2</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" class="dropdown">
                  <span>PHDFINRE</span>
                </a>
                <ul class="dropdownlist">
                  <li>
                    <a href="#">
                      <span>FINREP1</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" class="dropdown">
              <i class="fa fa-cog fa-2x" aria-hidden="true"></i>
              <span>DATASETSETUP</span>
            </a>
            <ul class="dropdownlist">
              <li>
                <a href="#">
                  <span>READINGBODYSITES</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>DOCUMEN</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>DSLIST</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>DATASETQUESTIONS</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>READINGTYPES</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>DATASETCLASSESTF</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" class="dropdown">
              <i class="fa fa-stethoscope fa-2x" aria-hidden="true"></i>
              <span>TRANSCRIPTION</span>
            </a>
            <ul class="dropdownlist">
              <li>
                <a href="#">
                  <span>TRANSCRIPTIONSETUP</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>DOCUMENTREQUISITION</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>DEFICIENCYTRACKING</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>MANAGEDOCUMENTPANEL</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import Vue from "vue";

  export default {
    name: 'App',
    data() {
      return {}
    },
    mounted() {
      this.setLeftMenu();
    },
    methods: {
      setLeftMenu() {
        document.querySelector(".hamburger").onclick = function () {
          let element = document.querySelector(".leftMenu");
          element.classList.toggle("openMenu");

          let hamburger = document.querySelector(".hamburger");
          hamburger.classList.toggle("open");

          let closeAccordion = document.getElementsByClassName('dropdown');
          let i = 0;
          for (let i = 0; i < closeAccordion.length; i++) {
            closeAccordion[i].classList.remove('active');
          }
        }

        let dropdown = document.getElementsByClassName('dropdown');
        for (let i = 0; i < dropdown.length; i++) {
          dropdown[i].onclick = function () {
            this.classList.toggle('active');
          }
        }
      },
    },
  }
</script>

<style>
</style>
