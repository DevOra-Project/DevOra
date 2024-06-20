// src/app/services/github.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Octokit } from "@octokit/rest";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private octokit: Octokit;
  
  private apiUrl = 'https://api.github.com';
  githubToken: string = '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';

  constructor(private http: HttpClient) {
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

 
  getCommitsByUser(username: string, repo: string): Observable<any[]> {
    const url = `${this.apiUrl}/repos/${username}/${repo}/commits`;
    const headers = new HttpHeaders({
      //'Authorization': `token ${environment.githubToken}`
      'Authorization': `token ${this.githubToken}`
    });

    return this.http.get<any[]>(url, { headers });
  }


  getCommitsByOrg(org: string, repo: string): Observable<any[]> {
    const url = `${this.apiUrl}/repos/${org}/${repo}/commits`;
    const headers = new HttpHeaders({
      'Authorization': `token ${this.githubToken}`
    });

    return this.http.get<any[]>(url, { headers });
  }


}
