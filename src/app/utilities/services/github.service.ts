// src/app/services/github.service.ts

import { Injectable } from '@angular/core';
import { Octokit } from "@octokit/rest";

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit();
  }

  setAuthToken(token: string) {
    this.octokit = new Octokit({
      auth: token
    });
  }

  async getUser(username: string) {
    try {
      const { data } = await this.octokit.users.getByUsername({ username });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getRepos(username: string) {
    try {
      const { data } = await this.octokit.repos.listForUser({ username });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getOrgRepos(org: string) {
    try {
      const { data } = await this.octokit.repos.listForOrg({ org });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
