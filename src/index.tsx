import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { ThemeProvider } from '1_App/providers/ThemeProvider';
import App from './1_App/App';
import '6_Shared/config/i18n/i18n';
import {ErrorBoundary} from "1_App/providers/ErrorBoundary";

const container = document.getElementById('root');
if (!container) {
    throw new Error('Root container missing in index.html');
}

const root = createRoot(container);

root.render(
    <BrowserRouter>
        <ErrorBoundary>
          <ThemeProvider>
            <Suspense fallback="">
              <App />
            </Suspense>
          </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>
);
