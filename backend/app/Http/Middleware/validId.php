<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class validId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, String $model, String $column = null, String $message = null): Response
    {

        $column = $column === null ? $model : $column;
        $message = $message === null ? $model . ' tidak ditemukan' : $message;

        $modelClass = "\\App\\Models\\" . $model;

        if (!class_exists($modelClass)) {
            abort(500, "Model {$modelClass} tidak ditemukan.");
        }

        $id = $request->route($model);

        if ($column == $model) {
            $find = $modelClass::find($id);
        } else {
            $find = $modelClass::where($column, $id)->first();
        }

        if (!$find) {
            return response()->json([
                'message' => $message
            ], 404);
        }
        
        return $next($request);
    }
}
