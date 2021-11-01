import { Action, DecoratedWatchedController, watch } from 'app-redux-utils';
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

const routerController: DecoratedWatchedController<[['redirectTo', RedirectToPayload]]> = RouterController as any;

export { routerController as RouterController };
