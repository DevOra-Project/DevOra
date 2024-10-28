import { Component, OnInit } from '@angular/core';
import { GithubService } from '../utilities/services/github.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-github-integration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './github-integration.component.html',
  styleUrl: './github-integration.component.scss'
})
export class GithubIntegrationComponent implements OnInit {
  user: any;
  repos: any[] =[];
  token: string = 'ghp_hC4yvFCWIZ9FGmChiibJ3T';
  org: string = '';
  loggedIn: boolean = false;

  constructor(private githubService: GithubService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

 
  login() {
    if (this.token) {
      this.githubService.setAuthToken(this.token);
      this.loggedIn = true;
      if (this.org) {
        this.loadOrgRepos(this.org);
      } else {
        this.loadUser('Mufment');
        this.loadRepos('Mufment');
      }
    } else {
      console.error('Token is required for authentication');
    }
  }

  async loadUser(username: string) {
    try {
      this.user = await this.githubService.getUser(username);
    } catch (error) {
      console.error(error);
    }
  }

  async loadRepos(username: string) {
    try {
      this.repos = await this.githubService.getRepos(username);
    } catch (error) {
      console.error(error);
      this.toastr.error("Error al cargar repositorios del usuario")
      this.loggedIn = false;

    }
  }

  async loadOrgRepos(org: string) {
    try {
      this.repos = await this.githubService.getOrgRepos(org);
    } catch (error) {
      console.error(error);
      this.toastr.error("Error al cargar repositorios de la organizacion")
      this.loggedIn = false;

    }
  }
}