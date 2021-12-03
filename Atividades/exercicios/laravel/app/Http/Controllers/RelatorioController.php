<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produto;
use App\Models\Pessoa;
use App\Models\Compra;

class RelatorioController extends Controller
{
    public function porPessoa(Request $request) {
    }

    public function porData(Request $request) {

    }

    public function porProduto(Request $request) {
        $produtos = Produto::orderBy('nome')->get();
        return view('relatorio.produto', ['produtos' => $produtos, 'compras' => []]);
    }

    public function porPessoaSearch(Request $request) {
    }

    public function porDataSearch(Request $request) {

    }

    public function porProdutoSearch(Request $request) {
        $produtos = Produto::orderBy('nome')->get();
        $compras = Compra::where('produto_id', $request->get('produto_id'))->get();
        return view('relatorio.produto', ['produtos' => $produtos, 'compras' => $compras]);
    }

    public function index() {
        return view('relatorio.index');
    }
}
