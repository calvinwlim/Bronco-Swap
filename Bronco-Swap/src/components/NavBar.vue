<template>
    <MDBNavbar expand="lg" light bg="light" container class="fixed-top">
      <MDBNavbarBrand href="#">Bronco Swap</MDBNavbarBrand>
      <MDBNavbarToggler
        @click="collapse1 = !collapse1"
        target="#navbarSupportedContent"
      ></MDBNavbarToggler>
      <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
        <MDBNavbarNav class="mb-2 mb-lg-0">
          <MDBNavbarItem to="#" active>
            Home
          </MDBNavbarItem>
          <MDBNavbarItem href="#">
            Browse
          </MDBNavbarItem>
          <MDBNavbarItem>
            <!-- Navbar dropdown -->
            <MDBDropdown class="nav-item" v-model="dropdown1">
              <MDBDropdownToggle
                tag="a"
                class="nav-link"
                @click="dropdown1 = !dropdown1"
                >Account</MDBDropdownToggle
              >
              <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
                <MDBDropdownItem href="#">Profile</MDBDropdownItem>
                <MDBDropdownItem href="#">Sign In</MDBDropdownItem>
                <MDBDropdownItem href="#"
                  >Sign Out</MDBDropdownItem
                >
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavbarItem>
        </MDBNavbarNav>
        <!-- Search form -->
        <form class="d-flex input-group w-auto">
          <input
            type="search"
            class="form-control"
            placeholder="Search for Items"
            aria-label="Search"
          />
          <MDBBtn outline="primary">
            Search
          </MDBBtn>
        </form>
      </MDBCollapse>
    </MDBNavbar>
  </template>

<script setup lang="ts">
  import {
    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';

  const collapse1 = ref(false);
  const dropdown1 = ref(false);
</script>