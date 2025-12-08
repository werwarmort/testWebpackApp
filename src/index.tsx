import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { ThemeProvider } from '1_App/providers/ThemeProvider';
import App from './1_App/App';
import '6_Shared/config/i18n/i18n';
import {ErrorBoundary} from "1_App/providers/ErrorBoundary";

render(
    <BrowserRouter>
        <ErrorBoundary>
          <ThemeProvider>
            <Suspense fallback="">
              <App />
            </Suspense>
          </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById('root'),
);
