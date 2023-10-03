import API from './API';

export default class NewsFeed {
  static get selector() { return '.newsfeed'; }

  static get selectorPostsContainer() { return '.newsfeed-posts'; }

  static get selectorRefreshButton() { return '.newsfeed-header-refresh_button'; }

  constructor(container = document.body) {
    this.container = container;
    this.addPost = this.addPost.bind(this);
    this.render = this.render.bind(this);
    this.elRoot = this.container.querySelector(NewsFeed.selector);
    this.elPosts = this.container.querySelector(NewsFeed.selectorPostsContainer);
    this.elRefreshButton = this.container.querySelector(NewsFeed.selectorRefreshButton);

    this.preloadHTML = this.elPosts.innerHTML;

    this.registerEvents();
  }

  registerEvents() {
    this.elRefreshButton.addEventListener('click', this.render);
  }

  async render() {
    this.elPosts.innerHTML = this.preloadHTML;
    try {
      const data = await API.getAllNews();
      this.elPosts.innerHTML = '';
      data.posts.forEach(this.addPost);
    } catch (error) {
      console.error(error);
      const elError = document.createElement('div');
      elError.classList.add('newsfeed-error-message');
      elError.innerHTML = 'Не удалось загрузить данные.<br>Проверьте подключение и обновите страницу.';
      this.elRoot.appendChild(elError);
    }
  }

  addPost(post) {
    const container = document.createElement('div');
    container.classList.add('newsfeed-post');
    container.innerHTML = `
      <div class="newsfeed-post">
        <h2 class="newsfeed-post-title">${post.title}</h2>
        <div class="newsfeed-post-body">
          <img class="newsfeed-post-body-image" src="${post.image}">
          <div class="newsfeed-post-body-content">
            ${post.content}
          </div>
        </div>
      </div>`;
    this.elPosts.appendChild(container);
  }
}
