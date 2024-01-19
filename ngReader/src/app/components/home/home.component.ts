import { CommonModule } from '@angular/common';
import { Star } from '../../models/star';
import { StarService } from './../../services/star.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  stars: Star[]= [];

  constructor(private starService: StarService){

  }

  ngOnInit(){
    this.loadStars();
  }

  loadStars(){
    this.starService.index().subscribe({
      next:(stars =>{
        this.stars = stars;
    }),
      error:(problem)=>{
        console.error(
          'TodoListHttpComponent.loadTodos(): error loading todos:'
        );
        console.error(problem);
        }
      });




  }
}
