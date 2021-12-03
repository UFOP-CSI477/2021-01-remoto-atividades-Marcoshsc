@extends('principal')

@section('conteudo')

    <form action="{{ route('compras.update', $compra->id) }}" method="post">

        @csrf
        @method('put')

        <div class="form-group">
            <label for="pessoa_id">Pessoa</label>

            <select name="pessoa_id" id="pessoa_id" class="form-control">

            @foreach($pessoas as $p)
                <option 
                value="{{$p->id}}"
                
                @if($p->id == $compra->pessoa->id)
                    selected
                @endif

                >{{$p->nome}}</option>
            @endforeach

            </select>

        </div>

        <div class="form-group">
            <label for="produto_id">Produto</label>

            <select name="produto_id" id="produto_id" class="form-control">

            @foreach($produtos as $pr)
                <option 
                value="{{$pr->id}}"
                @if($pr->id == $compra->produto->id)
                    selected
                @endif

                >{{$pr->nome}}</option>
            @endforeach

            </select>

        </div>

        <div class="form-group">
            <label for="data">Data</label>
            <input type="date" name="data" value="{{$compra->data}}" id="data" class="form-control"/>
        </div>

        <div class="text-right">
            <input type="submit" value="Atualizar" class="btn btn-primary">
            <input type="reset" value="Limpar" class="btn btn-danger">
        </div>

    </form>

@endsection('conteudo')
