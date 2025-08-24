<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Pelanggan;
use App\Models\Tagihan;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        try {
            $request->validate([
                "start_date" => ['nullable', 'date'],
                "end_date" => ['nullable', 'date'],
            ]);

            $startDate = $request->start_date;
            $endDate = $request->end_date;

            // Jika tidak ada start_date & end_date, gunakan bulan dari "now" atau hari ini
            if (!$startDate) {
                $nowDate = Carbon::parse(Carbon::now());
                $startDate = $nowDate->copy()->startOfMonth()->toDateString();
                $endDate = $nowDate->copy()->endOfMonth()->toDateString();
            }

            $startDate = Carbon::parse($startDate)->timezone('Asia/Jakarta')->toDateString();
            $endDate = Carbon::parse($endDate)->timezone('Asia/Jakarta')->toDateString();

            // Base query dengan eager loading
            $baseQuery = Tagihan::with('pelanggan.paket')
                ->when(auth()->user()->role_id == 1, function ($q) {
                    $q->whereHas('pelanggan', function ($sub) {
                        $sub->where('assign_to', auth()->id());
                    });
                })->whereBetween('tanggal', [$startDate, $endDate]);

            // Hitung total berdasarkan status
            $belumLunasSum = (clone $baseQuery)
                ->where('status', 'Belum Lunas')
                ->get()
                ->sum(fn($t) => $t->total_tagihan ?? 0);

            $lunasSum = (clone $baseQuery)
                ->where('status', 'Lunas')
                ->get()
                ->sum(fn($t) => $t->total_tagihan ?? 0);

            // Ambil 5 pelanggan terbaru (berdasarkan tanggal_pemasangan di rentang yang sama)
            $pelangganMasuk = Pelanggan::whereBetween('tanggal_pemasangan', [$startDate, $endDate])
                ->when(auth()->user()->role_id == 1, function ($q) {
                    $q->where('assign_to', auth()->id());
                })
                ->orderByDesc('tanggal_pemasangan')
                ->limit(5)
                ->get();

            // Ambil 5 tagihan terbaru
            $tagihanTanggal = (clone $baseQuery)
                ->orderByDesc('tanggal')
                ->limit(5)
                ->get();

            return response()->json([
                'belum_lunas_sum' => $belumLunasSum,
                'lunas_sum' => $lunasSum,
                'pelanggan' => $pelangganMasuk,
                'tagihan' => $tagihanTanggal,
                'date' => [
                    'start' => $startDate,
                    'end' => $endDate
                ]
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan pada server.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function dashboardClient(Request $request)
    {
        $today = now()->toDateString();

        $pelanggan = Pelanggan::with(['tagihan' => function ($q) use ($today) {
            $q->whereDate('tanggal', '<=', $today);
        }, 'paket'])
            ->where('assign_to', auth()->id())
            ->get();

        if ($pelanggan->isEmpty()) {
            return response()->json([
                'message' => 'Pelanggan tidak ditemukan',
                'belum_lunas' => 0,
                'lunas' => 0
            ]);
        }

        $belumLunas = $pelanggan->flatMap->tagihan
            ->where('status', 'Belum Lunas')
            ->sum('total_tagihan');

        $lunas = $pelanggan->flatMap->tagihan
            ->where('status', 'Lunas')
            ->sum('total_tagihan');

        return response()->json([
            'belum_lunas' => $belumLunas,
            'lunas' => $lunas,
        ]);
    }
}
