import { Action, watch, WatchedController } from 'app-redux-utils';
import { ControllerBase } from '~app/ControllerBase';

type RedirectToPayload = {
	url: string;
};

@watch
class RouterController extends ControllerBase {
	@watch
	redirectTo(action: Action<RedirectToPayload>) {
		super.redirect(action.payload.url);
	}
}

const routerController: WatchedController<RouterController> = RouterController as any;
export { routerController as RouterController };
