import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

import { AddArticleModel } from './add-article.model';

import { ArticlesActions } from '../store/articles/articles.actions';

@Component({
  selector: 'add-article',
  templateUrl: './add-article.component.html'
})

export class AddArticleComponent {
  article: AddArticleModel = new AddArticleModel();

  constructor (
    private NgRedux: NgRedux<IAppState>,
    private router: Router,
    private articlesActions: ArticlesActions) { }

  addArticle () {
    this.articlesActions.addArticle(this.article)
    let subscription = this.NgRedux
      .select(state => state.articles)
      .subscribe(articles => {
        if (articles.articleAdded) {
          const articleId = articles.articleAddedId;
          subscription.unsubscribe();
          this.router.navigateByUrl(`articles/details/${articleId}`)
        }
      })
  }
}
