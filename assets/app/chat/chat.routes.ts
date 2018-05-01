import { Routes, RouterModule } from "@angular/router";

import { ChatRoomComponent } from "./chat-room.component";
import { GameListComponent } from "./game-list.component";

const CHAT_ROUTES: Routes = [
    { path: '', redirectTo: 'chatroom', pathMatch: 'full' },
    { path: 'chatroom', component: ChatRoomComponent },
    { path: 'gamelist', component: GameListComponent }
]

export const chatRouting = RouterModule.forChild(CHAT_ROUTES);
