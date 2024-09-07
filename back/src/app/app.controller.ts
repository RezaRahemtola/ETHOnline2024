import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { CurrentGameState, ReducerBody } from "./app.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("game")
  getGame(): Promise<CurrentGameState> {
    return this.appService.getGame();
  }

  @Post("/:reducer")
  reducer(
    @Param("reducer") reducer: string,
    @Body() body: ReducerBody,
  ): Promise<void> {
    return this.appService.reducer(reducer, body);
  }
}
