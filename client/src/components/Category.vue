<template>
  <div class="blog">

    <div class="container-fluid">

      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/blog">Blog</a>
        </li>
        <li class="breadcrumb-item active">
          <a href="/blog/technology">Technology</a>
        </li>
      </ol>

      <div class="col-3">
        <div class="list-group">
          <div class="list-group-item list-group-item-action active">
            Category
          </div>

          <li class="list-group-item d-flex justify-content-between align-items-center">
            <router-link class="list-group-item-action" to="/blog/technology">Technology</router-link>
            <span class="badge badge-primary badge-pill">14</span>
          </li>

          <li class="list-group-item d-flex justify-content-between align-items-center">
            <router-link class="list-group-item-action" to="/blog/technology">Life Style</router-link>
            <span class="badge badge-primary badge-pill">2</span>
          </li>
        </div>
      </div>

    </div>
    <router-view/>
  </div>
</template>