import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { GameBoardComponent } from './game-board/game-board.component';


const routes: Routes = [
  {path:'',redirectTo:'landingPage',pathMatch:'full'},
  {path:'landingPage',component:LandingpageComponent},
  {path:'game',component:GameBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
